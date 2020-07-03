exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments()
        table.string('name', 500).notNullable()
        table.string('email', 500).notNullable()
        table.string('password', 500).notNullable()
        table.integer('active', 1).defaultTo(1)
        table.integer('removed', 1).defaultTo(0)
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};