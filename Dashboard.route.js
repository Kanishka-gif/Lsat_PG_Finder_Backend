const express = require("express");
const router = express.Router();

const dashboardController = require("../../controllers/auth/DashboardController");

// Routes for counts
router.get("/users/count", dashboardController.getUserCount);
router.get("/pgs/count", dashboardController.getPGCount);
router.get("/contact/count", dashboardController.getContactMessageCount);

module.exports = router;
