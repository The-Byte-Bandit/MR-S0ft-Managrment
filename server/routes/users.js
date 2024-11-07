const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Class = require('../models/class');
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
router.post('/create-user', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { firstname, lastname, email, password, classes, role } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Initialize an empty array to store valid class IDs for roles that require it
    let userClasses = [];
    if (role === 'teacher' || role === 'student') {
      // Only Teacher and Student roles have classes assigned
      if (Array.isArray(classes)) {
        userClasses = classes;
      }
    }

    // Create a new user with the specified role and additional fields
    const newUser = new User({
      firstname,
      lastname,
      email,
      password, // Remember to hash the password in production for security
      role,
      classes: userClasses, // Only Teachers and Students will have classes
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
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
router.get('/getUser/:id', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {

  
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'classes',
        select: 'title _id', // Fetch class titles and IDs only if classes exist
      });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      userId: user._id,
      userName: `${user.firstname} ${user.lastname}`,
      role: user.role,
      email: user.email,
      classes: user.classes ? user.classes.map(classItem => ({
        classId: classItem._id,
        className: classItem.title,
      })) : [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to get all users grouped by role
router.get('/all', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  console.log('getting all users');

  try {
    // Retrieve users and select only the ID, firstname, lastname, and role fields
    const users = await User.find({}, 'firstname lastname role');
    const students = await Student.find({}, 'firstname lastname'); // Fetch students with selected fields

    // Group users by role
    const groupedUsers = {
      Admin: [],
      'Course Advisor': [],
      Teacher: [],
      Student: []
    };

    // Process non-student users
    users.forEach(user => {
      const userData = {
        id: user._id,
        name: `${user.firstname} ${user.lastname}`
      };

      switch (user.role) {
        case 'admin':
          groupedUsers.Admin.push(userData);
          break;
        case 'course_advisor':
          groupedUsers['Course Advisor'].push(userData);
          break;
        case 'teacher':
          groupedUsers.Teacher.push(userData);
          break;
        default:
          break;
      }
    });

    // Add students to the Student group
    students.forEach(student => {
      const studentData = {
        id: student._id,
        name: `${student.firstname} ${student.lastname}`
      };
      groupedUsers.Student.push(studentData);
    });

    res.json(groupedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
