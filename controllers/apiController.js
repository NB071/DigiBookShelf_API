// knex configuration
const knexConfig = require("../knexfile");
const { knex } = require("knex");
const db = knex(knexConfig);

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { Configuration, OpenAIApi } = require("openai");
const path = require("node:path");
const fs = require("node:fs");
//////////////////////////////////
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//////////////////////////////////

module.exports.verify = async (req, res) => {
  //  the token is being check via the middleware
  res.json({ message: "valid token" });
};

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
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        user_id: user.user_id,
        shelf_id: user.shelf_id,
      },
      process.env.JWT_SIGN_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
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
    return res.status(400).json({ error: "Missing fields" });
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

    if (usernameCheck && emailCheck) {
      return res
        .status(409)
        .json({ error: "Username and Email already exist" });
    }

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
  const booksInShelf = await db("shelf")
    .join("book", "shelf.book", "=", "book.id")
    .where({ "shelf.book": bookId })
    .first();
  if (booksInShelf) {
    return res.status(200).json(booksInShelf);
  }

  const bookInDB = await db("book").where({ id: bookId }).first();
  if (!bookInDB) {
    return res.status(404).json({ message: "Book does not exist!" });
  }

  res.status(200).json(bookInDB);
};

// USER: Get shelf books
module.exports.fetchShelfBook = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const userId = decoded.user_id;

    let query = await db("shelf")
      .join("book", "book.id", "=", "shelf.book")
      .select(
        "shelf.*",
        "book.name AS book_name",
        "book.description",
        "book.genre",
        "book.total_pages",
        "book.author",
        "book.is_NYT_best_seller",
        "book.cover_image",
        "book.purchase_link",
        "book.created_at AS book_init_created_at"
      )
      .where({ user_id: userId });

    // search query filter
    if (query.length === 0) {
      return res.send(query);
    }
    if (
      req.query.pending !== undefined &&
      ["0", "1"].includes(req.query.pending)
    ) {
      query = query.filter((book) => +book.is_pending === +req.query.pending);
    }
    if (req.query.recent !== undefined) {
      const books = query;
      books.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      return res.json(books);
    } else {
      const books = query;
      books.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return res.json(books);
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
};

// USER: get all read genres
module.exports.userGenres = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const shelfId = decoded.shelf_id;

    // extract users fav genre if exists
    let query = await db("shelf")
      .select("book.id as book_id", "book.genre")
      .join("book", "shelf.book", "=", "book.id")
      .where({ shelf_id: shelfId });

    // if not, generates based on books genre in user's shelf
    const genresObj = query.reduce((genreCount, book) => {
      const { genre } = book;
      genreCount[genre] = (genreCount[genre] || 0) + 1;
      return genreCount;
    }, {});

    res.json(genresObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      .join("user", "friend_list.friend", "=", "user.user_id")
      .select(
        "friend_list.user_id",
        "user.username",
        "friend_list.friend",
        "user.avatar_image"
      )
      .where("friend_list.user_id", userId);
    return res.send({ ...query_user, friends: Array.from(query_friends) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again" });
  }
};

// USER: edit users info
module.exports.editUserData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const userId = decoded.user_id;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Empty request" });
    }
    const request = Object.keys(req.body)
      .filter((item) => item !== "user_id")
      .map((key) => ({ [key]: req.body[key] }));

    // delete the previous generated cover image
    if (req.file) {
      const query = await db("user")
        .where({
          user_id: userId,
        })
        .select("avatar_image")
        .first();
      const previousFile = path.basename(query.avatar_image);

      if (previousFile.startsWith("avatar_")) {
        const previousFilePath = path.join(
          __dirname,
          "..",
          "public",
          "avatarImages",
          previousFile
        );
        fs.rmSync(previousFilePath);
      }
    }

    const editUser = await db("user")
      .where({
        user_id: userId,
      })
      .update(
        Object.assign({}, ...request, {
          avatar_image: req.file
            ? `${process.env.SERVER_URL}:${process.env.PORT}/avatarImages/${req.file.filename}`
            : undefined,
        })
      );

    if (!editUser) {
      return res.status(400).json({ error: "wrong book ID or body request" });
    }
    res.json({ sucess: "user edited" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// USER: edit users password
module.exports.editUserPassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const userId = decoded.user_id;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Empty request" });
    }
    if (!req.body.password) {
      return res.status(400).json({ error: "missing password info" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db("user")
      .where({
        user_id: userId,
      })
      .update({ password: hashedPassword });

    res.json({ sucess: "password changed" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
      (!req.body.book_name ||
        !req.body.book_description ||
        !req.body.book_genre ||
        !req.body.book_author ||
        req.body.total_pages === undefined) &&
      (!req.file || !req.body.cover_image)
    ) {
      console.log(req.body);
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
      is_NYT_best_seller,
      book_id,
    } = req.body;
    const bookId = v4();

    if (is_NYT_best_seller) {
      await db("shelf").insert({
        user_id: userId,
        shelf_id: shelfId,
        book: book_id,
        read_pages: read_pages ? read_pages : 0,
        is_pending: read_pages === total_pages ? 0 : 1,
      });

      return res.json({ sucess: "book added" });
    }
    // add the book to the book table
    await db("book").insert({
      id: bookId,
      name,
      description,
      genre,
      author,
      total_pages,
      cover_image: `${
        req.file
          ? `${process.env.SERVER_URL}:${process.env.PORT}/bookCovers/${req.file.filename}`
          : cover_image
      }`,
      is_NYT_best_seller: req.body.is_NYT_best_seller ? 1 : 0,
    });

    // add the book to the user's shelf
    await db("shelf").insert({
      user_id: userId,
      shelf_id: shelfId,
      book: bookId,
      read_pages: read_pages ? read_pages : 0,
      is_pending: read_pages === total_pages ? 0 : 1,
    });

    res.json({ sucess: "book added" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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

    // delete the previous generated cover image
    const query = await db("book")
      .where({
        id: req.body.book_id,
      })
      .select("cover_image")
      .first();

    const previousFile = path.basename(query.cover_image);

    if (previousFile.startsWith("bookCover_")) {
      const previousFilePath = path.join(
        __dirname,
        "..",
        "public",
        "bookCovers",
        previousFile
      );
      fs.rmSync(previousFilePath);
    }

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

// USER: edit a book itself
module.exports.editUserBookInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const shelfId = decoded.shelf_id;

    // get books info
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Enter book ID + the field to update" });
    }

    const request = Object.keys(req.body)
      .filter((item) => item !== "book_id" && item !== "read_pages")
      .map((key) => ({ [key]: req.body[key] }));

    // delete the previous generated cover image
    if (req.file) {
      const query = await db("book")
        .where({
          id: req.params.bookId,
        })
        .select("cover_image")
        .first();

      const previousFile = path.basename(query.cover_image);

      if (previousFile.startsWith("bookCover_")) {
        const previousFilePath = path.join(
          __dirname,
          "..",
          "public",
          "bookCovers",
          previousFile
        );
        fs.rmSync(previousFilePath);
      }
    }

    // check if the book is for the user
    const book = await db("shelf").where({
      shelf_id: shelfId,
      book: req.params.bookId,
    });
    if (book.length === 0) {
      return res.status(404).json({ error: "book not found in the shelf" });
    }

    await db("book")
      .where({
        id: req.params.bookId,
      })
      .update(
        Object.assign({}, ...request, {
          cover_image: req.file
            ? `${process.env.SERVER_URL}:${process.env.PORT}/bookCovers/${req.file.filename}`
            : undefined,
        })
      );

    if (req.body.read_pages) {
      if (+req.body.read_pages === +req.body.total_pages) {
        await db("shelf")
          .where({
            shelf_id: shelfId,
            book: req.params.bookId,
          })
          .update({
            is_pending: 0,
            read_pages: req.body.read_pages,
            updated_at: db.fn.now(),
          });
        return res.json({ sucess: "book edited" });
      } else {
        await db("shelf")
          .where({
            shelf_id: shelfId,
            book: req.params.bookId,
          })
          .update({
            is_pending: 1,
            read_pages: req.body.read_pages,
            updated_at: db.fn.now(),
          });
        return res.json({ sucess: "book edited" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

// USER: edit a book itself
module.exports.userActivities = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    const shelfId = decoded.shelf_id;

    // check if the book is for the user
    const book = await db("shelf")
      .where({
        shelf_id: shelfId,
      })
      .select("created_at", "updated_at");
    if (book.length === 0) {
      return res.status(404).json({ error: "book not found in the shelf" });
    }
    const updatedData = book.map((item, index) => ({
      activity: index + 1,
      ...item,
    }));

    return res.json(updatedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};
