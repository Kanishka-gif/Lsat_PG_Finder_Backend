// routes/wishlist.route.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../../models/Wishlist.model');
const verifyToken = require('../../middleware/verifyToken');

// Add to Wishlist
router.post('/add', async (req, res) => {
  const { id,name,location,image,rent } = req.body;
  console.log(id);
  try {
    const exists = await Wishlist.findOne({  id });
    if (exists) return res.status(400).json({ message: 'Already in wishlist' });

    const item = new Wishlist(
        { id,name,rent,image,location }
    );
    await item.save();
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's Wishlist
router.get('/',  async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from Wishlist
router.delete('/:id', async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
