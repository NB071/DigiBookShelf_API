/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("friend_list").del();
  await knex("friend_list").insert([
    {
      user_id: "admin",
      friend: "admin_friend1",
      status: "accepted"
    },
    {
      user_id: "admin_friend1",
      friend: "admin",
      status: "accepted"
    },
    {
      user_id: "admin",
      friend: "admin_friend2",
      status: "accepted"
    },
    {
      user_id: "admin_friend2",
      friend: "admin",
      status: "accepted"
    },
  ]);
};
