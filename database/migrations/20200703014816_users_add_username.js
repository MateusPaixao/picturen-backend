exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.string('username', 500).nullable()
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('username')
    })
  
};
