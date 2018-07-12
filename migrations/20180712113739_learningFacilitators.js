const { composeMigration } = require('./util')

exports.up = composeMigration(knex =>
  knex.schema
    .createTable('learningFacilitators', function (table) {
      table.uuid('id').unique().primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.string('email').unique().notNullable()
      table.string('password')
      table.timestamps(true, true)
    }),
__filename
)

exports.down = composeMigration(knex => knex.schema.dropTableIfExists('learningFacilitators'), __filename)
