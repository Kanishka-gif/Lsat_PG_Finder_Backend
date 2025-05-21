const express = require("express");
const router = express.Router();
const Contact = require("../../models/Contact.model");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (err) {
    console.error("Error saving contact form:", err);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    const count = await Contact.countDocuments();

    res.json({ contact: messages, count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
