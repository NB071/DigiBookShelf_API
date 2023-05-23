const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const apiController = require("../controllers/apiController");
const { authorize } = require("../utils/Authorize_middleware");
// auth
router.post("/login", apiController.login);
router.post("/register", apiController.register);
router.get("/verify", authorize, apiController.verify);

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest;
    console.log(file);
    if (file && file.fieldname === "cover_image") {
      dest = path.join(__dirname, "..", "public", "bookCovers");
    } else if (file && file.fieldname === "avatar_image") {
      dest = path.join(__dirname, "..", "public", "avatarImages");
    } 

    console.log(dest);

    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const prefix = req.file && req.file.fieldname === 'cover_image' ? 'bookCover' : 'avatar';
    cb(null, `${prefix}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
});

// GET: NYT top seller
router.get("/nyt-best-seller", authorize, apiController.nytBooks);

// GET: singe book info
router.get("/books/:bookId", authorize, apiController.fechSingeBook);

router.get("/user/activities", authorize, apiController.userActivities);

// USER routes
router
  .route("/user")
  .get(authorize, apiController.fetchAllUserData)
  .patch(authorize, upload.single("avatar_image"), apiController.editUserData);

// USER: PATCH: edit a single book
router.patch(
  "/user/books/:bookId",
  authorize,
  upload.single("cover_image"),
  apiController.editUserBookInfo
);
router
  .route("/user/books")
  .get(authorize, apiController.fetchShelfBook)
  .post(authorize, upload.single("cover_image"), apiController.addUserBook)
  .delete(authorize, apiController.deleteUserBook);

router.get("/user/books/genres", authorize, apiController.userGenres);

// USER routes

module.exports = router;
