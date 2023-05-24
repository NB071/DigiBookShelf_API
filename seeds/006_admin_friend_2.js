/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").where({ user_id: "admin_friend2" }).del();
  await knex("user").insert([
    {
      user_id: "admin_friend2",
      shelf_id: "admin_friend345",
      first_name: "ross",
      last_name: "test",
      username: "ross001",
      email: "ross001@gmail.com",
      password: "$2a$10$f7uQgmsTUwIvOuJRiw/xl.9GYz7UJF6JBPB/Z290DntlyoePz6WNC",
      goal_set: 7,
      favorite_genre: "comedy",
      avatar_image: "https://i.pravatar.cc/150?img=13",
    },
  ]);
};
