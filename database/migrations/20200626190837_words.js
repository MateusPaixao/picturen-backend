exports.up = function (knex) {
    return knex.schema.createTable('words', function (table) {
        table.increments()
        table.string('link', 700).notNullable()
        table.string('word', 700).notNullable()
        table.string('username', 700).notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('words')
};
