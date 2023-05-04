const router = require("express").Router();
const accountController = require("../controllers/accountController");

// login 
router.post('/login', accountController.login)
router.post('/register', accountController.register)

module.exports = router;
