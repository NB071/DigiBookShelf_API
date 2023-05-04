/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shelf").where({ user_id: "admin" }).del();
  await knex("shelf").insert([
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "635b4c9d-cd88-4bf0-8f03-dcf71d0b7b8b",
      read_pages: "25",
    },
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "c091a71d-47a0-4307-8159-3e8653e8f5dc",
      read_pages: "25",
    },
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "8a037ef3-5b50-49ed-8a50-9edf3bc0b2a9",
      read_pages: "0",
    },
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "23694ce4-27ec-42ba-bea4-43543bca7f5d",
      read_pages: "200",
    },
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "635b4c9d-cd88-4bf0-8f03-dcf71d0b7b8b",
      read_pages: "292",
      is_pending: 0,
    },
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "635b4c9d-cd88-4bf0-8f03-dcf71d0b7b8b",
      read_pages: "384",
      is_pending: 0,
    },
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "635b4c9d-cd88-4bf0-8f03-dcf71d0b7b8b",
      read_pages: "292",
      is_pending: 0,
    },
    {
      user_id: "admin",
      shelf_id: "admin123",
      book: "635b4c9d-cd88-4bf0-8f03-dcf71d0b7b8b",
      read_pages: "292",
      is_pending: 0,
    },
  ]);
};
