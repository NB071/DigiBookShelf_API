/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friend_list", (table) => {
    table
      .uuid("user_id")
      .references("user.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.uuid("friend").references("user.user_id").notNullable();
    table.boolean("is_online").nullable().defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("friend_list");
};
