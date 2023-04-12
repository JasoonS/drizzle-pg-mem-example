const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core");
const { drizzle } = require("drizzle-orm/node-postgres");
const { migrate } = require("drizzle-orm/node-postgres/migrator");
const { users } = require("./schema");

let PoolToUse;
if (!!process.env.USE_PG_MEM) {
  const newDb = require("pg-mem").newDb;
  const { Pool } = newDb().adapters.createPg();
  PoolToUse = Pool;
} else {
  const { Pool } = require("pg");
  PoolToUse = Pool;
}

const pool = new PoolToUse({
  host: "127.0.0.1",
  port: 5433,
  user: "postgres",
  password: "testing",
  database: "test-db",
});

const db = drizzle(pool);

async function main() {
  // The below line fails when using `pg-mem`
  await migrate(db, { migrationsFolder: "./migrations-folder" });

  await db.insert(users).values({
    id: 123,
    fullName: "Jason Smythe",
    phone: "555-555-5555",
  });
  await db.insert(users).values({
    id: 124,
    fullName: "Jono Prest",
    phone: "555-555-5555",
  });

  const allUsers = await db.select().from(users);

  console.log("all users", allUsers)
}

main();

module.exports.db = db;
