const router = require("express").Router();

const register = require("../../controllers/auth/register");
const { login } = require('../../controllers/auth/login');
const sendMail = require("../../controllers/auth/sendMail");
const verifyOtp = require("../../controllers/auth/verifyOtp");
const DashboardController = require("../../controllers/auth/DashboardController");
const authorizeRole = require("../../middleware/authorizeRole");


router.post("/register",register);
router.post("/login",login);
router.post("/sendMail", sendMail);
router.post("/verifyOtp", verifyOtp);
router.get("/DashboardCntroller", DashboardController.getUserCount);
router.get("/DashboardCntroller", DashboardController.getPGCount);
router.get("/DashboardCntroller", DashboardController.getContactMessageCount);



module.exports = router;