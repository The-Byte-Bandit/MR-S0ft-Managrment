const express = require('express');
const router = express.Router();
const Classes = require('../models/class');
const Student = require('../models/student');
const User = require('../models/user');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');

// Create a new class
router.post('/create', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
    const { courseId,title, teachers, startDate, endDate } = req.body;
    console.log(req.body);
    
  
    try {
      // Validate if the teachers array is provided and is not empty
      if (!teachers || !Array.isArray(teachers) || teachers.length === 0) {
        return res.status(400).json({ message: 'At least one teacher must be assigned to the class' });
      }
  
      // Validate if courseId is provided
      if (!courseId) {
        return res.status(400).json({ message: 'Course ID must be provided' });
      }
  
      // Create a new class with the course ID and teacher IDs
      const newClass = new Classes({ course: courseId, title, teachers, startDate, endDate });
      await newClass.save();
  
      // Loop through the teachers array and add the new class to each teacher's classes
      for (const teacherId of teachers) {
        await User.findByIdAndUpdate(
          teacherId,
          { $push: { classes: newClass._id } }, // Add the new class ID to the teacher's classes array
          { new: true }
        );
      }
  
      // Populate the course and teacher details
      const populatedClass = await Classes.findById(newClass._id)
        .populate('course', 'title') // Assuming the Course model has a 'title' field
        .populate('teachers', 'firstname lastname'); // Populate the 'teachers' field
  
      // Structure the response to include names and IDs
      const response = {
        _id: populatedClass._id,
        className: populatedClass.title,
        courseName: populatedClass.course.title,
        courseId: populatedClass.course._id,
        teachers: populatedClass.teachers.map(teacher => ({
          teacherName: `${teacher.firstname} ${teacher.lastname}`,
          teacherId: teacher._id
        })),
        startDate: populatedClass.startDate,
        endDate: populatedClass.endDate
      };
  
      res.status(201).json({ message: 'Class created successfully', class: response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

// Update class details
router.put('/:id/update', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
    const { courseId, title, teachers, startDate, endDate } = req.body;
  
    try {
      // Prepare an object to hold the fields to be updated
      const updateData = {};
  
      // Only add fields to updateData if they have valid values
      if (courseId) updateData.course = courseId;
      if (title && title.trim() !== '') updateData.title = title; // Ensure title is not an empty string
      if (Array.isArray(teachers) && teachers.length > 0) updateData.teachers = teachers;
      if (startDate) updateData.startDate = startDate;
      if (endDate) updateData.endDate = endDate;
  
      // Update the class with the provided information
      const updatedClass = await Classes.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      // Ensure that the class was found and updated
      if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      // If teachers were updated, ensure their records are also updated
      if (teachers && teachers.length > 0) {
        for (const teacherId of teachers) {
          await User.findByIdAndUpdate(
            teacherId,
            { $addToSet: { classes: updatedClass._id } }, // Add class ID without duplicates
            { new: true }
          );
        }
      }
  
      // Populate details for response
      const populatedClass = await Classes.findById(updatedClass._id)
        .populate('course', 'title')
        .populate('teachers', 'firstname lastname');
  
      // Structure the response
      const response = {
        _id: populatedClass._id,
        className: populatedClass.title,
        courseName: populatedClass.course.title,
        courseId: populatedClass.course._id,
        teachers: populatedClass.teachers.map(teacher => ({
          teacherName: `${teacher.firstname} ${teacher.lastname}`,
          teacherId: teacher._id
        })),
        startDate: populatedClass.startDate,
        endDate: populatedClass.endDate
      };
  
      res.json({ message: 'Class updated successfully', class: response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Delete a course
router.delete('/:id',authenticateUser,  verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    await Classes.findByIdAndDelete(req.params.id);
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add students to a class
router.post('/:classId/add-students', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
    const { students } = req.body; // Array of student IDs
    const classId = req.params.classId;
  
    try {
      // Find the class by ID
      const targetClass = await Classes.findById(classId);
  
      if (!targetClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      // Check if students array is not empty
      if (!students || !Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ message: 'No students provided' });
      }
  
      // Loop through the array of student IDs
      const addedStudents = [];
      for (const studentId of students) {
        // Check if the student exists
        const student = await Student.findById(studentId);
        if (student) {
          // Add student to the class if not already present
          if (!targetClass.students.includes(studentId)) {
            targetClass.students.push(studentId);
            addedStudents.push(student);
  
            // Also add the class ID to the student's classes array
            if (!student.classes.includes(classId)) {
              await Student.findByIdAndUpdate(
                studentId,
                { $push: { classes: classId } }, // Add the class ID to the student's classes array
                { new: true }
              );
            }
          }
        } else {
          console.warn(`Student with ID ${studentId} not found`);
        }
      }
  
      // Save the updated class with new students
      await targetClass.save();
  
      res.status(200).json({
        message: 'Students added successfully to the class',
        addedStudents
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });


// Get all classes
// router.get('/', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
//     try {
//       // Find all classes and populate course and teachers
//       const classes = await Classes.find()
//         .populate('course', 'title') // Assuming the Course model has a 'title' field
//         .populate('teachers', 'firstname lastname'); // Assuming the User model has 'firstname' and 'lastname' fields
  
//       // Map through the classes to create a detailed response structure
//       const response = classes.map(classItem => ({
//         _id: classItem._id,
//         className: classItem.title,
//         courseName: classItem.course.title,
//         courseId: classItem.course._id,
//         teachers: classItem.teachers.map(teacher => ({
//           teacherName: `${teacher.firstname} ${teacher.lastname}`,
//           teacherId: teacher._id
//         })),
//         startDate: classItem.startDate,
//         endDate: classItem.endDate
//       }));
  
//       res.json({ message: 'Classes retrieved successfully', classes: response });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Server error', error });
//     }
//   });



router.get('/', authenticateUser, verifyRole(['admin', 'course_advisor', 'teacher', 'student']), async (req, res) => {
  console.log(req.user.role);

  try {
    let classes;

    if (req.user.role === 'student') {
      // Fetch student details to retrieve assigned class IDs
      const student = await Student.findById(req.user.userId).populate('classes');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }


      // Fetch classes based on the student's assigned classes array
      classes = await Classes.find({ _id: { $in: student.classes } })
        .populate('course', 'title')
        .populate('teachers', 'firstname lastname');
    } else {
      // Fetch user details to retrieve assigned class IDs for admin, course_advisor, and teacher roles
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Use the classes array from the User model to retrieve relevant classes
      classes = await Classes.find({ _id: { $in: user.classes } })
        .populate('course', 'title')
        .populate('teachers', 'firstname lastname');
    }

    // Format the response structure
    const response = classes.map(classItem => ({
      _id: classItem._id,
      className: classItem.title,
      courseName: classItem.course?.title || 'N/A',
      courseId: classItem.course?._id || null,
      teachers: classItem.teachers.map(teacher => ({
        teacherName: `${teacher.firstname} ${teacher.lastname}`,
        teacherId: teacher._id
      })),
      isActive: classItem.isActive,
      startDate: classItem.startDate,
      endDate: classItem.endDate
    }));

    res.json({ message: 'Classes retrieved successfully', classes: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
});
  
  

module.exports = router;