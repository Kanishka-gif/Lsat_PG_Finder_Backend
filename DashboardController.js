const User = require("../../models/User.model");
const PG = require("../../models/PG");
const ContactMessage = require("../../models/Contact.model");

exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user count" });
  }
};

exports.getPGCount = async (req, res) => {
  try {
    const count = await PG.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get PG count" });
  }
};

exports.getContactMessageCount = async (req, res) => {
  try {
    const count = await ContactMessage.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get contact message count" });
  }
};
