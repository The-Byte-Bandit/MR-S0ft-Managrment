const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');

// Create a new course
router.post('/create',authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { title } = req.body;
  try {
    const newCourse = new Course({ title });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update course details
router.put('/:id/update', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { title } = req.body;
  const courseId = req.params.id; // Get course ID from the URL

  try {
    // Check if course ID is provided in the URL
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required to update the course.' });
    }

    // Prepare an object to hold the fields to be updated
    const updateData = {};

    // Only add fields to updateData if they have valid values
    if (title && title.trim() !== '') updateData.title = title; // Ensure title is not an empty string

    // If no valid fields were provided, return an error
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    // Update the course with the provided information
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true }
    );

    // Ensure that the course was found and updated
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Respond with the updated course details
    res.json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Delete a course
router.delete('/:id',authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Get a course by ID
router.get('/:id', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all courses
router.get('/', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const courses = await Course.find();
    console.log([courses]);
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;