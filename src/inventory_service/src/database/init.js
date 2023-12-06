const pgp = require("pg-promise")();

const dbConnection = {
  host: "inventory_database",
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const db = pgp(dbConnection);

db.connect()
  .then((obj) => {
    console.log("Successfully connected to database");
    obj.done();
  })
  .catch((err) => {
    console.log(`Failed to connect to database.\n${err.message || err}`);
  });

module.exports = db;
