const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Classes = require('../models/class');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');
const Student = require('../models/student');

// Create a new student account
router.post('/create-student', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { 
    firstname, 
    lastname, 
    email, 
    password, 
    phone, 
    address, 
    qualification, 
    classes, 
    duration, 
    trainingFee, 
    amountPaid, 
    balance, 
    guardianName, 
    guardianRelationship, 
    guardianPhone, 
    counselor, 
    startDate, 
    endDate, 
    remark 
  } = req.body;

  try {
    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    // Create a new student
    const newStudent = new Student({
      firstname,
      lastname,
      email,
      password, // Store password as plain text (NOT RECOMMENDED in production)
      role: 'student',
      phone,
      address,
      qualification,
      classes: Array.isArray(classes) ? classes : [],
      duration,
      trainingFee,
      amountPaid,
      balance,
      guardianName,
      guardianRelationship,
      guardianPhone,
      counselor,
      startDate,
      endDate,
      remark
    });

    // Save the new student to the database
    await newStudent.save();

    // Update each class in the classes array to add the student to its students array
    if (Array.isArray(classes) && classes.length > 0) {
      await Promise.all(
        classes.map(async (classId) => {
          await Classes.findByIdAndUpdate(
            classId,
            { $addToSet: { students: newStudent._id } }, // Adds student to class if not already included
            { new: true }
          );
        })
      );
    }

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

    // Initialize an array for class IDs if the role is teacher or student
    let userClasses = [];
    if ((role === 'teacher' || role === 'student') && Array.isArray(classes)) {
      userClasses = classes;
    }

    // Create the new user with specified details
    const newUser = new User({
      firstname,
      lastname,
      email,
      password, // Ensure to hash this in production for security
      role,
      classes: userClasses,
    });

    // Save the new user to the database
    await newUser.save();

    // Add the user to each specified class's students or teachers array based on role
    if (userClasses.length > 0) {
      await Promise.all(userClasses.map(async (classId) => {
        const classDoc = await Classes.findById(classId);
        if (!classDoc) return; // Skip if class not found

        if (role === 'student') {
          if (!classDoc.students.includes(newUser._id)) {
            classDoc.students.push(newUser._id); // Add student to students array
          }
        } else if (role === 'teacher') {
          if (!classDoc.teachers.includes(newUser._id)) {
            classDoc.teachers.push(newUser._id); // Add teacher to teachers array
          }
        }
        await classDoc.save(); // Save each updated class document
      }));
    }

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Deactivate a or user student account
router.put('/:id/deactivate', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { role } = req.body;
  console.log(role, 'sdccdc', req.params.id);
  

  try {
    // Determine the model to use based on the role
    const Model = role.toLowerCase() === 'student' ? Student : User;

    // Find and update the user's isActive status to false
    const user = await Model.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} account deactivated`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reactivate a user or student account
router.put('/:id/reactivate', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { role } = req.body;

  

  try {
    // Determine the model to use based on the role
    const Model = role.toLowerCase() === 'student' ? Student : User;

    // Find and update the user's isActive status to true
    const user = await Model.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} account reactivated`, user });
  } catch (error) {
    console.error(error);
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
router.get('/:id/students', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select('-password') // Exclude the password field
      .populate({
        path: 'classes',
        select: 'title _id', // Fetch class titles and IDs only if classes exist
      });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      studentId: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      role: student.role,
      isActive: student.isActive,
      createdAt: student.createdAt,
      phone:student.phone,
      address:student.address,
      qualification:student.qualification,
      duration:student.duration,
      trainingFee:student.trainingFee,
      amountPaid:student.amountPaid,
      balance:student.balance,
      guardianName:student.guardianName,
      guardianRelationship:student.guardianRelationship,
      guardianPhone:student.guardianPhone,
      counselor:student.counselor,
      startDate:student.startDate,
      endDate:student.endDate,
      remark:student.remark,
      isActive:student.isActive,
      isDeferred:student.isDeferred,
      deferReason:student.deferReason,
      defermentDate:student.defermentDate,
      returnDate:student.returnDate,
      createdAt:student.createdAt,

      classes: student.classes
        ? student.classes.map((classItem) => ({
            classId: classItem._id,
            className: classItem.title,
          }))
        : [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get full data for a specific teacher by ID
router.get('/:id/getUser', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password') // Exclude the password field
      .populate({
        path: 'classes',
        select: 'title _id', // Fetch class titles and IDs only if classes exist
      });

    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user.isActive);
    

    res.json({
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
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
