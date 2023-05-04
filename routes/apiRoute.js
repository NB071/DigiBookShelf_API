const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { authorize } = require("../utils/Authorize_middleware");

// auth
router.post("/login", apiController.login);
router.post("/register", apiController.register);

// GET: NYT top seller
router.get("/nyt-best-seller", authorize, apiController.nytBooks);

module.exports = router;
