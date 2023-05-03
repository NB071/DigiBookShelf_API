const { fetchWeeklyTopSellerNYT } = require("../utils/NYT_GetTopSeller");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("book").where('is_NYT_best_seller', 1).del()
  try {
    const NYT_best_sellers = await fetchWeeklyTopSellerNYT();
    NYT_best_sellers.map(book => {
      return {id: book.id,
      name: book.name,
    descrition: book.description,
  genre: }
    })
    await knex("book").insert();
  } catch (error) {
    throw error;
  }
};
