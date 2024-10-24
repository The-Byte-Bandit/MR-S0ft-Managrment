const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Create a new course
router.post('/create', verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { title, description, duration } = req.body;
  try {
    const newCourse = new Course({ title, description, duration });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course details
router.put('/:id/update', verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { title, description, duration } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { title, description, duration }, { new: true });
    res.json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a course
router.delete('/:id', verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
