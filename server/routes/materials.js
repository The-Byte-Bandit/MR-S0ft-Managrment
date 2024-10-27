const express = require('express');
const multer = require('multer');
const router = express.Router();
const Material = require('../models/material');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/', // Directory for storing files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 } // Limit to 10MB files
});

// Upload material (PDF or YouTube link)
router.post('/upload', upload.single('pdf'),authenticateUser, verifyRole(['admin', 'course_advisor', 'teacher,']), async (req, res) => {
  const { courseId, type, url } = req.body;
  try {
    const filePath = req.file ? `/uploads/${req.file.filename}` : url;
    const newMaterial = new Material({
      type: req.file ? 'pdf' : 'youtube',
      url: filePath,
      course: courseId,
      uploadedBy: req.user._id,
    });
    await newMaterial.save();
    res.status(201).json({ message: 'Material uploaded successfully', material: newMaterial });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all materials for a course
router.get('/:courseId/materials', async (req, res) => {
  try {
    const materials = await Material.find({ course: req.params.courseId });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;