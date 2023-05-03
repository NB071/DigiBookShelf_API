const axios = require("axios");
require("dotenv").config();

// this module will get all the genres from nyt for DB
async function fetchGenres() {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.NYT_API_KEY}`
    );
    const genres = response.data.results.map((result) => {
      return { name: result.list_name_encoded };
    });
    return genres;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchGenres,
};
