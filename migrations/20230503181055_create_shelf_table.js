/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("shelf", (table) => {
    table.increments("id");
    table
      .uuid("user_id")
      .references("user.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .uuid("shelf_id")
      .references("user.shelf_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .uuid("book")
      .references("book.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      table.integer("read_pages").defaultTo(0).nullable();
      table.boolean("is_pending").defaultTo(1)
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("shelf");
};
