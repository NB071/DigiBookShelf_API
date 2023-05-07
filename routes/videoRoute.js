const router = require("express").Router();
const videoController = require("../controllers/videoController");

router.get("/:videoName", videoController.loginVideo);

module.exports = router;