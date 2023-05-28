/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notifications", function (table) {
    table.increments("id").primary();
    table.uuid("recipient_id").notNullable().references("user.user_id");
    table.string("notification_type").notNullable();
    table.uuid("sender_id").notNullable().references("user.user_id");
    table.text("message");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
