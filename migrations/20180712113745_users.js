const { composeMigration } = require('./util')

exports.up = composeMigration(knex =>
  knex.schema
    .createTable('users', function (table) {
      table.uuid('id').unique().primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('stack').unique().notNullable()
      table.boolean('is_active').defaultTo(false)
      table.string('cohort')
      table.uuid('created_by').references('id').inTable('learningFacilitators')
      table.timestamps(true, true)
    }),
__filename
)

exports.down = composeMigration(knex => knex.schema.dropTableIfExists('users'), __filename)
