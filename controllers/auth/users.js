
const User = require('../../models/User.model');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// ✅ Update a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};
//Add a user
const addUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 

    const newUser = new User(req.body);      
    await newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error("Add user error:", err); 

    res.status(500).json({ error: "Failed to add user" });
  }
};

module.exports = { getAllUsers, deleteUser, updateUser, addUser };
