const express = require('express');
const router = express.Router();
const Classes = require('../models/class')
const Course = require('../models/course');
const Student = require('../models/student');
const Material = require('../models/material');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');

// Get all assigned classes for the logged-in student
router.get('/classes', authenticateUser, async (req, res) => {
  const {id} = req.body;
  try {
    // Fetch the student by ID and populate their classes with course information
    const student = await Student.findById(id).populate({
      path: 'classes',
      model: 'Classes', // Explicitly set the model to 'Classes'
      populate: {
        path: 'course',
        select: 'title'
      }
    });
    

    // Check if the user is a student and has classes
    if (!student || student.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized access', student });
    }

    // If the student has no classes, respond with an empty array
    if (!student.classes || student.classes.length === 0) {
      return res.json({ message: 'No classes assigned to this student', classes: [] });
    }

    // Respond with the populated classes
    res.json({
      message: 'Classes retrieved successfully',
      classes: student.classes.map(classItem => ({
        _id: classItem._id,
        className: classItem.title,
        courseName: classItem.course ? classItem.course.title : 'Unknown',
        courseId: classItem.course ? classItem.course._id : null,
        startDate: classItem.startDate,
        endDate: classItem.endDate
      }))
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get materials for a specific course
router.get('/courses/:id/materials', authenticateUser, verifyRole(['admin', 'course_advisor', 'teacher', 'student']), async (req, res) => {
  try {
    // Fetch materials for the given course ID
    const materials = await Material.find({ course: req.params.id }).populate('course', 'title');

    // Check if materials exist
    if (!materials || materials.length === 0) {
      return res.status(404).json({ message: 'No materials found for this course' });
    }

    // Provide a detailed response with course information
    res.json({
      message: 'Materials retrieved successfully',
      materials: materials.map(material => ({
        _id: material._id,
        type: material.type,
        url: material.url,
        courseName: material.course ? material.course.title : 'Unknown',
        uploadedAt: material.uploadedAt
      }))
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;