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
      first_name: "test",
      last_name: "user",
      username: "test",
      email: "test@gmail.com",
      password: "$2a$10$f7uQgmsTUwIvOuJRiw/xl.9GYz7UJF6JBPB/Z290DntlyoePz6WNC",
      goal_set: 20,
      favorite_genre: "non-finction"
    },
  ]);
};
