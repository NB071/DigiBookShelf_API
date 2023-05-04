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
      { username: user.username },
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
  const books =  await db('book').where({is_NYT_best_seller: 1})
  res.send(books);
  
}