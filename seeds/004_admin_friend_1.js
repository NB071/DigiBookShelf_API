/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").where({ user_id: "admin_friend1" }).del();
  await knex("user").insert([
    {
      user_id: "admin_friend1",
      shelf_id: "admin_friend123",
      first_name: "alexa",
      last_name: "test",
      username: "alexa001",
      email: "alexa001@gmail.com",
      password: "$2a$10$f7uQgmsTUwIvOuJRiw/xl.9GYz7UJF6JBPB/Z290DntlyoePz6WNC",
      goal_set: 10,
      favorite_genre: "fiction",
      avatar_image: "https://i.pravatar.cc/150?img=5",
    },
  ]);
};
