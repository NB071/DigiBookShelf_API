const { fetchWeeklyTopSellerNYT } = require("../utils/NYT_GetTopSeller");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("book").where({ is_NYT_best_seller: 1 }).del();
  try {
    const NYT_best_sellers = await fetchWeeklyTopSellerNYT();
    const books = NYT_best_sellers.map((book) => {
      return {
        id: book.id,
        name: book.name,
        description: book.description,
        genre: book.genre,
        total_pages: +book.total_pages,
        author: book.author,
        is_NYT_best_seller: 1,
        cover_image: book.cover_image,
        purchase_link: book.purchase_link,
      };
    });
    await knex("book").insert(books);
  } catch (error) {
    throw error;
  }
};
