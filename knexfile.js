// Update with your config settings.

require("dotenv-safe").config()

let {
  DB_NAME,
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_URL
} = process.env

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    migrations: {
        directory: './database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    // connection: DB_URL,
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    useNullAsDefault: true
  }

};
