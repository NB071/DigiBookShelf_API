const { fetchGenres } = require("../utils/NYT_GetGenres");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("genre").del();
  try {
    const genres = await fetchGenres();
    await knex("genre").insert(genres);
  } catch (error) {
    throw error;
  }
};
