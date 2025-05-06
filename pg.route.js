



const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PG = require("../../models/PG");

// Check if the uploads directory exists, if not, create it
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|avif|png/; // Allow only these file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'), false);
  },
});

// Serve static files (uploaded images)
router.use('/uploads', express.static('uploads'));

// Add PG with Image
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);  // Debug to check if file is uploaded

    const newPG = new PG({
      name: req.body.name,
      location: req.body.location,
      rent: req.body.rent,
      security: req.body.security,
      facilities: req.body.facilities,
      contact: req.body.contact,
      image: req.file ? "/uploads/" + req.file.filename : null,  // Image path
    });

    await newPG.save();
    res.status(201).json({ message: "PG added successfully!" });
  } catch (error) {
    console.error("Error adding PG:", error);
    res.status(500).json({ error: "Failed to add PG" });
  }
});

// Get all PGs
router.get("/", async (req, res) => {
  try {
    const pgs = await PG.find();
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching PGs" });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedPG = await PG.findByIdAndDelete(req.params.id);
    if (!deletedPG) {
      return res.status(404).json({ message: 'PG not found' });
    }
    res.json({ message: 'PG deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// // In your pg.route.js
// router.put('/edit/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedPG = await PG.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json(updatedPG);
//   } catch (error) {
//     res.status(500).json({ error: "Error updating PG" });
//   }
// });


module.exports = router;
