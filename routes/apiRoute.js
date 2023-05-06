const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { authorize } = require("../utils/Authorize_middleware");

// auth
router.post("/login", apiController.login);
router.post("/register", apiController.register);

// GET: NYT top seller
router.get("/nyt-best-seller", authorize, apiController.nytBooks);

// GET: singe book info
router.get("/books/:bookId", authorize, apiController.fechSingeBook);

// USER routes

router.route("/user").get(authorize, apiController.fetchAllUserData);

router
  .route("/user/books")
  .get(authorize, apiController.fetchShelfBook)
  .post(authorize, apiController.addUserBook).delete(authorize, apiController.deleteUserBook)

router
  .route("/user/books/recommendation")
  .get(authorize, apiController.recommendBook);
// USER routes

module.exports = router;
