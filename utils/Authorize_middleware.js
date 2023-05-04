const jwt = require("jsonwebtoken");
require("dotenv").config();
function authorize(req, res, next) {
  if (!req.headers.authorization) {
    return res.json({ error: "no token" });
  }
  jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SIGN_KEY,
    (err, decoded) => {
      if (err) {
        return res.json({ error: "Invalid token" });
      }
      req.decoded = decoded;
    }
  );
  next()
}
module.exports = {
  authorize,
};
