const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Material = require('../models/material');

// Get all assigned courses for a student
router.get('/courses', async (req, res) => {
  try {
    const student = await User.findById(req.user._id).populate('courses');
    res.json(student.courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get materials for a specific course
router.get('/courses/:id/materials', async (req, res) => {
  try {
    const materials = await Material.find({ course: req.params.id });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
