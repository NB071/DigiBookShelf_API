const { v4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").where({ user_id: "admin" }).del();
  await knex("user").insert([
    {
      user_id: "admin",
      shelf_id: "admin123",
      first_name: "nima",
      last_name: "bargestan",
      username: "nimab",
      email: "test@gmail.com",
      password: "password",
      goal_set: 20,
      favorite_genre: "fiction"
    },
  ]);
};
