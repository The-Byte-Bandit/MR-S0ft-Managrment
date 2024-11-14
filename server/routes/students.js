const express = require('express');
const router = express.Router();
const Classes = require('../models/class')
const Course = require('../models/course');
const Student = require('../models/student');
const Material = require('../models/material');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');

// Get all assigned classes for the logged-in student
router.get('/:id/classes', authenticateUser,verifyRole(['admin', 'course_advisor', 'teacher', 'student']), async (req, res) => {
  const { id } = req.params;
  console.log('student', id);
  console.log('student');
  
  
  try {
    // Find the student by ID and populate their classes
    const student = await Student.findById(id).populate({
      path: 'classes',
      model: 'Classes',
      populate: {
        path: 'course',
        select: 'title'
      }
    });

    if (!student || student.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    if (!student.classes || student.classes.length === 0) {
      return res.json({ message: 'No classes assigned to this student', classes: [] });
    }

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


router.put('/:id/defer-admission', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { deferReason, defermentDate, returnDate } = req.body;
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.isDeferred = true;
    student.deferReason = deferReason || 'No reason provided';
    student.defermentDate = defermentDate || new Date();
    student.returnDate = returnDate || null;

    await student.save();

    res.status(200).json({ message: 'Admission deferred successfully', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;