// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { Module } = require("module");

//////////////////////////////////
require("dotenv").config();
//////////////////////////////////

module.exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.send(400).json({ error: "Missing fields" });
  }

  const { email, password } = req.body;

  try {
    const user = await db("user").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    const token = jwt.sign(
      { username: user.username, user_id: user.user_id },
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
    favorite_genre,
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
    const user = await db("user").where({ username }).first();

    // if user exists in database
    if (user) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // add the user to the database
    const addedUser = await db("user")
      .insert({
        user_id: v4(),
        shelf_id: v4(),
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword,
        avatar_image: avatar_image || undefined,
        goal_set: goal_set || undefined,
        favorite_genre: favorite_genre || undefined,
      })
      .returning("username");

    // generate the JWT
    const token = jwt.sign(
      { username: addedUser.username, user_id: addedUser.user_id },
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
