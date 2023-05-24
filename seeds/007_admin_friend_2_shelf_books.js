/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shelf").where({ user_id: "admin_friend2" }).del();
  const bookIds = await knex("book")
    .select("id", "total_pages")
    .where({ is_NYT_best_seller: 0 });
  const shelfRecords = bookIds.map((book) => {
    const readPages = Math.floor(Math.random() * (book.total_pages + 1));
    const isPending = readPages === book.total_pages ? 0 : 1;
    return {
      user_id: "admin_friend2",
      shelf_id: "admin_friend345",
      book: book.id,
      read_pages: readPages,
      is_pending: isPending,
    };
  });
  await knex("shelf").insert(shelfRecords);
};
