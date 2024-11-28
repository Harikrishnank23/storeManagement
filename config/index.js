const config = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  PORT: process.env.PORT || 9001,
  CONNECTION_LIMIT: 10,

  MYSQL_HOST: "localhost",
  MYSQL_USER: "root",
  MYSQL_PASSWORD: "",
  MYSQL_DB: "ddflogbookmodel",

  JWTSECRET: "SomeSecret",
  MASTER_PORT: 9002,
  STAFF_PORT: 9003,
  SUPERVISOR_PORT: 9004,
};

module.exports = config;
