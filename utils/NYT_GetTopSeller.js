const axios = require("axios");
require("dotenv").config();
const { v4 } = require("uuid");

// this module will get `weekly` top seller from nyt
async function fetchWeeklyTopSellerNYT() {
  try {
    // Fetch the weekly top seller books from the NYT API
    const response = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.NYT_API_KEY}`
    );

    // Loop through each book in the list and extract relevant information
    const promises = response.data.results.books.map(async (item) => {
      // Fetch book information from Google Books API based on ISBN number
      const googleBooksResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${item.primary_isbn13}`
      );

      // Extract genre information from Google Books API response
      const genre = googleBooksResponse.data.items[0].volumeInfo.categories[0];

      // Get total page count from Google Books API response
      const pageCount =
        googleBooksResponse.data.items[0].volumeInfo.pageCount || 0;

      // Return book information
      return {
        id: v4(),
        rank: item.rank,
        name: item.title.toLowerCase(),
        description: item.description.toLowerCase(),
        genre: genre.toLowerCase(),
        total_pages: pageCount,
        author: item.author.toLowerCase(),
        cover_image: item.book_image,
        purchase_link: item.amazon_product_url,
      };
    });
    return Promise.all(promises);
  } catch (error) {
    throw error;
  }
}
(async function () {
  try {
    const result = await fetchWeeklyTopSellerNYT();
    
    result.filter(book => {
      
    })
    

  } catch (error) {
    console.error(error);
  }
})();
module.exports = {
  fetchWeeklyTopSellerNYT,
};
