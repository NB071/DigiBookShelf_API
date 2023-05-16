const jwt = require("jsonwebtoken");
require("dotenv").config();
function authorize(req, res, next) {
  if (req.path === "/sign-up") {
    next();
  } else if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authentication required" });
  } else {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SIGN_KEY,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        req.decoded = decoded;
        next();
      }
    );
  }
}
module.exports = {
  authorize,
};
