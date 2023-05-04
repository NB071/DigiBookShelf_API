// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//////////////////////////////////
require("dotenv").config();
//////////////////////////////////

module.exports.login = async (req, res) => {
  ;
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
