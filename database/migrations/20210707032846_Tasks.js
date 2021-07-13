exports.up = function(knex) {
    return knex.schema
    .createTable("Tasks", (tbl) => {
        tbl.increments("id").unique().notNullable()
        tbl.string("Task").notNullable()
        tbl.integer("UserID").references("id")
          .inTable("Users").notNullable()
          .onUpdate("CASCADE")
          .onDelete("CASCADE")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("Tasks");
  };