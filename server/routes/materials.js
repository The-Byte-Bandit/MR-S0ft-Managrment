const express = require('express');
const multer = require('multer');
const router = express.Router();
const Material = require('../models/material');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');
const axios = require('axios');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/', 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }
});

// Function to fetch YouTube title
const getYouTubeTitle = async (url) => {
  const videoId = url.split('v=')[1]?.split('&')[0];
  if (videoId) {
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    );
    return response.data.items[0]?.snippet.title;
  }
  return 'Unknown Video';
};

// Upload material (PDF or YouTube link)
router.post('/upload', upload.single('pdf'), authenticateUser, verifyRole(['admin', 'course_advisor', 'teacher']), async (req, res) => {
  const { courseId, url } = req.body;

  try {
    const filePath = req.file ? `/uploads/${req.file.filename}` : url;
    const name = req.file 
      ? req.file.originalname 
      : await getYouTubeTitle(url); 

    const newMaterial = new Material({
      type: req.file ? 'pdf' : 'youtube',
      name,
      url: filePath,
      course: courseId,
      uploadedBy: req.user.userId,
    });

    await newMaterial.save();
    res.status(201).json({ message: 'Material uploaded successfully', material: newMaterial });
  } catch (error) {
    console.log(error);
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