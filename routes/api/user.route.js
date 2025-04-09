const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUser,
  addUser,
} = require("../../controllers/auth/users");

router.get("/", getAllUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser); 

module.exports = router;
