module.exports = {
  localhost: {
    username: "root",
    password: "samsung",
    database: "bliive",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci"
      }
    }
  },
  development: {
    username: "root",
    password: "password",
    database: "bliive",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci"
      }
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    logging: false,
    define: {
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci"
      }
    }
  }
}
