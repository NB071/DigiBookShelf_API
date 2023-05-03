/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friend_list", (table) => {
    table.increments("id");
    table.uuid("user_id").references("user.id");
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
