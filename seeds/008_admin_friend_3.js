/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").where({ user_id: "admin_friend3" }).del();
  await knex("user").insert([
    {
      user_id: "admin_friend3",
      shelf_id: "admin_friend678",
      first_name: "max",
      last_name: "test",
      username: "max001",
      email: "max001@gmail.com",
      password: "$2a$10$f7uQgmsTUwIvOuJRiw/xl.9GYz7UJF6JBPB/Z290DntlyoePz6WNC",
      goal_set: 20,
      favorite_genre: "comedy",
      avatar_image: "https://i.pravatar.cc/150?img=20",
    },
  ]);
};
