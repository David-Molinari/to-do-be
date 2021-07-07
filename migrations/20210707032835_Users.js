exports.up = function(knex) {
    return knex.schema
    .createTable("Users", (tbl) => {
        tbl.increments("id").unique().notNullable();
        tbl.string("Username").unique().notNullable();
        tbl.string("Password").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Users");
};