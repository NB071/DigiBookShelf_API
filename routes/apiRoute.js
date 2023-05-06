const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { authorize } = require("../utils/Authorize_middleware");

// auth
router.post("/login", apiController.login);
router.post("/register", apiController.register);
router.get("/verify", authorize, apiController.authentication);

// GET: NYT top seller
router.get("/nyt-best-seller", authorize, apiController.nytBooks);

// GET: singe book info
router.get("/books/:bookId", authorize, apiController.fechSingeBook);

// USER routes

router.route("/user").get(authorize, apiController.fetchAllUserData);

// USER: PATCH: edit a single book
router.patch("/user/books/:bookId", authorize, apiController.editUserBookInfo);
router
  .route("/user/books")
  .get(authorize, apiController.fetchShelfBook)
  .post(authorize, apiController.addUserBook)
  .delete(authorize, apiController.deleteUserBook)
  .patch(authorize, apiController.editUserBook);

router
  .route("/user/books/recommendation")
  .get(authorize, apiController.recommendBook);
// USER routes

module.exports = router;
