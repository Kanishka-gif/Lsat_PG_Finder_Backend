const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const PG = require("../../models/PG");
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    // Specify the folder to save uploaded files
    const uploadFolder = path.join(__dirname, "uploads");
    // Create the upload folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error("Only image files are allowed!"));
  },
}).single("image"); // match your frontend input field name

router.post("/add", upload, async (req, res) => {
  try {
    const newPG = new PG({
      name: req.body.name,
      location: req.body.location,
      rent: req.body.rent,
      security: req.body.security,
      facilities: req.body.facilities,
      contact: req.body.contact,
      image: req.file.buffer.toString("base64"),
    });
    await newPG.save();
    res.status(201).json({ message: "PG added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add PG" });
  }
});


// Get all PGs
router.get("/", async (req, res) => {
  try {
    const pgs = await PG.find();
        const count = await PG.countDocuments();
    
    res.json({pgs,count});
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
// for PG Details 
// router.get('/:id', async (req, res) => {
//   try {
//     const pg = await PGModel.findById(req.params.id);
//     if (!pg) {
//       return res.status(404).json({ error: 'PG not found' });
//     }
//     res.json(pg);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid PG ID format" });
  }

  try {
    const pg = await PG.findById(id);
    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }
    res.json(pg);
  } catch (error) {
    console.error("Error fetching PG by ID:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});


// PUT /api/pgs/:id — Update PG
router.put("/:id", upload, async (req, res) => {
  try {
    const { id } = req.params;

    // Prepare update object
    const updateFields = {
      name: req.body.name,
      location: req.body.location,
      rent: req.body.rent,
      security: req.body.security,
      facilities: req.body.facilities,
      contact: req.body.contact,
    };

    // If a new image is uploaded
    if (req.file) {
      updateFields.image = req.file.buffer.toString("base64");
    }

    const updatedPG = await PG.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedPG) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.status(200).json({ message: "PG updated successfully", pg: updatedPG });
  } catch (error) {
    console.error("Error updating PG:", error.message);
    res.status(500).json({ error: "Failed to update PG" });
  }
});



module.exports = router;
