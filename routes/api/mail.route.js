const express = require("express");
const router = express.Router();
const sendMail = require("../../controllers/auth/sendMail");
const verifyOtp = require("../../controllers/auth/verifyOtp");

router.post("/sendMail", sendMail);
router.post("/verifyOtp", verifyOtp);

module.exports = router;
