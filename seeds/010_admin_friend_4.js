/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").where({ user_id: "admin_friend4" }).del();
  await knex("user").insert([
    {
      user_id: "admin_friend4",
      shelf_id: "admin_friend901",
      first_name: "bob",
      last_name: "test",
      username: "bob001",
      email: "bob001@gmail.com",
      password: "$2a$10$f7uQgmsTUwIvOuJRiw/xl.9GYz7UJF6JBPB/Z290DntlyoePz6WNC",
      goal_set: 5,
      favorite_genre: "non-fiction",
      avatar_image: "https://i.pravatar.cc/150?img=7",
    },
  ]);
};
