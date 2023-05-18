/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("book", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.text("description").notNullable();
    table.string("genre").notNullable();
    table.integer("total_pages").unsigned().notNullable();
    table.string("author").notNullable();
    table.boolean("is_NYT_best_seller").defaultTo(0).nullable();
    table
      .string("cover_image")
      .defaultTo("https://via.placeholder.com/600x400.png?text=+")
      .nullable();
    table.text("purchase_link").defaultTo("#").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("book");
};
