// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/todo.db3'
    }
  },

  production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './database/migrations'
      },
      seeds: {
        directory: './database/seeds'
      }
    }

};
