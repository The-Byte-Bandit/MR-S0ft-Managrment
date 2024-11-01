const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');
const Student = require('../models/student');

// Create a new student account
router.post('/create-student', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { firstname, lastname, email, password, classes } = req.body;
  
  try {
    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      console.log('Student with this email already exists');
      
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    // Initialize an empty array to store valid class IDs
    const studentClasses = [];

    // Loop through the incoming classes array and add each to the studentClasses array
    if (Array.isArray(classes)) {
      for (const classId of classes) {
        studentClasses.push(classId);
      }
    }

    // Create a new student using the Student model (no password hashing)
    const newStudent = new Student({
      firstname,
      lastname,
      email,
      password, // Store password as plain text (NOT RECOMMENDED)
      role: 'student',
      classes: studentClasses, // Set the array of class IDs
    });

    // Save the new student to the database
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new teacher account
router.post('/create-teacher', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { firstname, lastname, email, password, classes } = req.body;

  try {
    // Check if a teacher with the same email already exists
    const existingTeacher = await User.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher with this email already exists' });
    }

    // Initialize an empty array to store valid class IDs
    const teacherClasses = [];

    // Loop through the incoming classes array and add each to the teacherClasses array
    if (Array.isArray(classes)) {
      for (const classId of classes) {
        teacherClasses.push(classId);
      }
    }

    // Create a new teacher using the User model
    const newTeacher = new User({
      firstname,
      lastname,
      email,
      password, // Store password as plain text (NOT RECOMMENDED)
      role: 'teacher',
      classes: teacherClasses, // Set the array of class IDs
    });

    // Save the new teacher to the database
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher: newTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Deactivate a student account
router.put('/:id/deactivate',authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Student account deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reactivate a student account
router.put('/:id/reactivate',authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: true });
    res.json({ message: 'Student account reactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// // Get all students (Admin-only)
// router.get('/get-students',authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all teachers (Admin-only)
// router.get('/get-teachers', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
//   try {
//     const teachers = await User.find({ role: 'teacher' })
//       .populate({
//         path: 'classes',
//         select: 'title _id', // Select only title and ID from the Class schema
//       });

//     // Format the response to include teachers and their classes
//     const formattedTeachers = teachers.map(teacher => ({
//       teacherId: teacher._id,
//       teacherName: `${teacher.firstname} ${teacher.lastname}`,
//       classes: teacher.classes.map(classItem => ({
//         classId: classItem._id,
//         className: classItem.title,
//       })),
//     }));

//     res.json({ teachers: formattedTeachers });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// Get minimal data for all students
router.get('/students', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const students = await Student.find().select('firstname lastname _id'); // Fetch only ID and names
    res.json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get minimal data for all teachers
router.get('/teachers', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('firstname lastname _id'); // Fetch only ID and names
    res.json({ teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get full data for a specific student by ID
router.get('/students/:id', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('classes', 'title _id'); // Populate class titles
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get full data for a specific teacher by ID
router.get('/teachers/:id', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id)
      .populate({
        path: 'classes',
        select: 'title _id', // Fetch class titles and IDs only
      });

    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.json({
      teacherId: teacher._id,
      teacherName: `${teacher.firstname} ${teacher.lastname}`,
      classes: teacher.classes.map(classItem => ({
        classId: classItem._id,
        className: classItem.title,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
