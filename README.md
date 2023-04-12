# drizzle-pg-mem-example

Simple example of pg-mem with drizzle.

## Usage

Create migrations (no need to runagain, already created and committed):

```bash
yarn create-migration
```

Run db script on postgres (you'll need to have the database running locally via docker or similar):

```bash
yarn start
```

Run db script on pg-mem (this command gives an error):

```bash
yarn start-mem
```
