/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.uuid("user_id").primary();
    table.uuid("shelf_id").primary().index();
    table.string("first_name", 100).notNullable();
    table.string("last_name", 100).notNullable();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table
      .string("avatar_image")
      .defaultTo("https://i.pravatar.cc/150?img=2")
      .nullable();
    table.integer("goal_set").nullable();
    table.string("favorite_genre").defaultTo("none").nullable();
    table.boolean("is_online").defaultTo(0).nullable();
    table.timestamp("joined_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
