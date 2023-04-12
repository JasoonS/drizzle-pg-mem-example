const {
  pgTable,
  serial,
  text,
  varchar,
} = require("drizzle-orm/pg-core");

module.exports.users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});
