const router = require("express").Router();

const register = require("../../controllers/auth/register");
const { loginUser } = require('../../controllers/auth/login');


router.post("/register", register);
router.post("/login", loginUser);


module.exports = router;