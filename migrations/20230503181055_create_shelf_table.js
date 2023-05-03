/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("shelf", (table) => {
    table.increments("id")
    table.uuid("shelf_id").references("user.shelf_id");
    table.uuid("book").references("book.id");
    table.timestamp("add_date").defaultTo(knex.fn.now());
    table.boolean("is_pending").nullable();
    table.string("read_pages").nullable();
    table.boolean("is_completed").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("shelf");
};
