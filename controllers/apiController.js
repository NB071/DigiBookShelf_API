// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { Configuration, OpenAIApi } = require("openai");

//////////////////////////////////
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//////////////////////////////////

module.exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const { email, password } = req.body;

  try {
    const user = await db("user").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(user);

      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        user_id: user.user_id,
        shelf_id: user.shelf_id,
      },
      process.env.JWT_SIGN_KEY,
      { expiresIn: "1h" }
    );

    res.send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.register = async (req, res) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.first_name ||
    !req.body.last_name
  ) {
    return res.send(400).json({ error: "Missing fields" });
  }

  const {
    username,
    email,
    password,
    first_name,
    last_name,
    avatar_image,
    goal_set,
  } = req.body;

  // check for email format
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: "incorrect email format" });
  }

  // check for names to be starings
  if (
    !first_name.match(/^[A-Za-z][A-Za-z'-]*$/) ||
    !last_name.match(/^[A-Za-z][A-Za-z'-]*$/)
  ) {
    return res.status(400).json({ error: "incorrect naming format" });
  }

  try {
    const usernameCheck = await db("user").where({ username }).first();
    const emailCheck = await db("user").where({ email }).first();

    // if user exists in database
    if (usernameCheck) {
      return res.status(409).json({ error: "Username already exists" });
    }
    if (emailCheck) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = v4();
    // add the user to the database
    await db("user").insert({
      user_id: userId,
      shelf_id: v4(),
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      avatar_image: avatar_image || undefined,
      goal_set: goal_set || undefined,
    });
    // get the new user id and username for jwt
    const newUser = await db("user").where({ user_id: userId }).first();

    const token = jwt.sign(
      {
        username: newUser.username,
        user_id: newUser.user_id,
        shelf_id: newUser.shelf_id,
      },
      process.env.JWT_SIGN_KEY,
      { expiresIn: "24h" }
    );
    res.send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.nytBooks = async (req, res) => {
  const books = await db("book").where({ is_NYT_best_seller: 1 });
  res.send(books);
};

module.exports.fechSingeBook = async (req, res) => {
  const { bookId } = req.params;
  const books = await db("book").where({ id: bookId }).first();
  if (!books) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(books);
};

// USER: Get shelf books
module.exports.fetchShelfBook = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const userId = decoded.user_id;
    let query = db("shelf").where({ user_id: userId });

    // search query filter
    if (
      req.query.pending !== undefined &&
      (req.query.pending === "0" || req.query.pending === "1")
    ) {
      query = query.where({ is_pending: req.query.pending });
    }

    if (req.query.recent !== undefined) {
      const book = await query.orderBy("add_date", "desc").first();
      res.send(book);
    } else {
      const books = await query.orderBy("add_date", "desc");
      res.send(books);
    }
  } catch (err) {
    return res.status(401).json(err);
  }
};

// USER: get recommendation based on user's genre

module.exports.recommendBook = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const shelfId = decoded.shelf_id;

    // extract users fav genre
    let query = await db("shelf")
      .select("book.id as book_id", "book.genre")
      .join("book", "shelf.book", "=", "book.id")
      .where({ shelf_id: shelfId });

    const genresObj = query.reduce((genreCount, book) => {
      const { genre } = book;
      genreCount[genre] = (genreCount[genre] || 0) + 1;
      return genreCount;
    }, {});
    const favGenre = Object.entries(genresObj).reduce(
      (favGenre, [genre, count]) => {
        if (count > favGenre.count) {
          favGenre.genre = genre;
          favGenre.count = count;
        }
        return favGenre;
      },
      { genre: null, count: 0 }
    );
    // use AI to find 5 books with user's favorite genre
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Response with json format (in []) recommending 5 books in ${favGenre.genre} genre. give me the {"name", "description": short 4 sentence, "genre", "total_pages", "author", "cover_image", "purchase_link"}`,
      max_tokens: 2000,
    });

    res.send(completion.data.choices[0].text);
  } catch (err) {
    console.log(err.response.data.error);
    res.send(500).json({ error: "Try again" });
  }
};

// USER: get all users info
module.exports.fetchAllUserData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const userId = decoded.user_id;

    // extract users fav genre
    const query_user = await db("user")
      .select(
        "first_name",
        "last_name",
        "username",
        "email",
        "avatar_image",
        "goal_set",
        "favorite_genre"
      )
      .where({ user_id: userId })
      .first();
    const query_friends = await db("friend_list")
      .select("friend")
      .where({ user_id: userId });
    console.log(query_friends);
    res.send({ ...query_user, friends: Array.from(query_friends) });
  } catch (err) {
    console.log(err);
    res.send(500).json({ error: "Try again" });
  }
};

// USER: add a book
module.exports.addUserBook = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const shelfId = decoded.shelf_id;
    const userId = decoded.user_id;

    // get books info
    if (
      !req.body.book_name ||
      !req.body.book_description ||
      !req.body.book_genre ||
      !req.body.book_author ||
      !req.body.total_pages ||
      !req.body.cover_image
    ) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const {
      book_name: name,
      book_description: description,
      book_genre: genre,
      book_author: author,
      total_pages,
      read_pages,
      cover_image,
    } = req.body;
    const bookId = v4();

    // add the book to the book table
    await db("book").insert({
      id: bookId,
      name,
      description,
      genre,
      author,
      total_pages,
      cover_image,
      is_NYT_best_seller: 0,
    });

    // add the book to the user's shelf
    await db("shelf").insert({
      user_id: userId,
      shelf_id: shelfId,
      book: bookId,
      read_pages: read_pages ? read_pages : undefined,
      is_pending: read_pages === total_pages ? 0 : 1,
    });

    res.json({ sucess: "book added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

// USER: delete a book
module.exports.deleteUserBook = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const shelfId = decoded.shelf_id;

    // get books info
    if (!req.body.book_id) {
      return res.status(400).json({ error: "book_id is missing" });
    }
    await db("shelf")
      .where({ shelf_id: shelfId, book: req.body.book_id })
      .del();

    res.json({ sucess: "book deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

// USER: edit a book for shelf
module.exports.editUserBook = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const shelfId = decoded.shelf_id;

    // get books info
    if (!req.body.book_id || Object.keys(req.body).length < 2) {
      return res
        .status(400)
        .json({ error: "Enter book ID + the field to update" });
    }

    const request = Object.keys(req.body)
      .filter((item) => item !== "book_id")
      .map((key) => ({ [key]: req.body[key] }));

    // edit the books based on the req body
    const editdBook = await db("shelf")
      .where({
        shelf_id: shelfId,
        book: req.body.book_id,
      })
      .update(Object.assign({}, ...request));
    if (!editdBook) {
      return res.status(400).json({ error: "wrong book ID or body request" });
    }
    res.json({ sucess: "book edited" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};
