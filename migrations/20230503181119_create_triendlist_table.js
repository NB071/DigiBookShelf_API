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
    table.json("friends").defaultTo({});
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("friend_list");
};
