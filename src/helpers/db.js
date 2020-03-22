import knex from 'knex'

const db = knex({
  client: process.env.DB_TYPE,
  connection: {
    filename: process.env.DB_FILE,
  },
  useNullAsDefault: true,
})

const createTables = async () => {
  !(await db.schema.hasTable('posts'))
    ? await db.schema.createTable('posts', table => {
        table.increments().primary()
        table.string('title')
        table.string('text')
        table.string('author')
        table.timestamp('created').defaultTo(new Date().toLocaleString())
        table.timestamp('updated').defaultTo(new Date().toLocaleString())
      })
    : null
}

createTables()

export default db
