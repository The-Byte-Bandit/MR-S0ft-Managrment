const express = require('express');
const router = express.Router();
const Classes = require('../models/class');
const Course = require('../models/course');
const Student = require('../models/student');
const User = require('../models/user');
const verifyRole = require('../middleware/roleMiddleware');
const authenticateUser = require('../middleware/authenticateUser');
const mongoose = require('mongoose'); // Import mongoose


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

      // Increment the class count for the course
      await Course.findByIdAndUpdate(
        courseId,
        { $inc: { classCount: 1 } }, // Increment the classCount by 1
        { new: true }
    );
  
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

// Fetch details of a specific class
router.get('/:id', authenticateUser, verifyRole(['admin', 'course_advisor', 'teacher', 'student']), async (req, res) => {
  try {
    const classId = req.params.id;

    const classDetails = await Classes.findById(classId)
      .populate('course', 'title') // Populate course title
      .populate('teachers', 'firstname lastname') // Populate teachers' names
      .populate('students', 'firstname lastname'); // Populate students' names

    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const response = {
      _id: classDetails._id,
      className: classDetails.title,
      courseName: classDetails.course?.title || 'N/A',
      courseId: classDetails.course?._id || null,
      teachers: classDetails.teachers.map(teacher => ({
        teacherName: `${teacher.firstname} ${teacher.lastname}`,
        teacherId: teacher._id
      })),
      students: classDetails.students.map(student => ({
        studentName: `${student.firstname} ${student.lastname}`,
        studentId: student._id
      })),
      isActive: classDetails.isActive,
      startDate: classDetails.startDate,
      endDate: classDetails.endDate,
    };

    res.json({ message: 'Class details retrieved successfully', class: response });
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

// Delete a class
router.delete('/:id', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
      const classId = req.params.id;

      // Find the class to get the associated course ID
      const targetClass = await Classes.findById(classId);

      if (!targetClass) {
          return res.status(404).json({ message: 'Class not found' });
      }

      const courseId = targetClass.course;

      // Delete the class
      await Classes.findByIdAndDelete(classId);

      // Decrement the class count for the course
      if (courseId) {
          await Course.findByIdAndUpdate(
              courseId,
              { $inc: { classCount: -1 } }, // Decrement the classCount by 1
              { new: true }
          );
      }

      res.json({ message: 'Class deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
  }
});


router.delete('/:classId/remove-student/:studentId', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { classId, studentId } = req.params;

  try {
    const targetClass = await Classes.findById(classId);

    if (!targetClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (!targetClass.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student not assigned to this class' });
    }

    targetClass.students = targetClass.students.filter((id) => id.toString() !== studentId);
    await targetClass.save();

    await Student.findByIdAndUpdate(
      studentId,
      { $pull: { classes: classId } },
      { new: true }
    );

    res.status(200).json({ message: 'Student removed from the class successfully',studentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});


router.delete('/:classId/remove-teacher/:teacherId', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { classId, teacherId } = req.params;

  try {
    const targetClass = await Classes.findById(classId);

    if (!targetClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (!targetClass.teachers.includes(teacherId)) {
      return res.status(400).json({ message: 'Teacher not assigned to this class' });
    }

    targetClass.teachers = targetClass.teachers.filter((id) => id.toString() !== teacherId);
    await targetClass.save();

    await User.findByIdAndUpdate(
      teacherId,
      { $pull: { classes: classId } },
      { new: true }
    );

    res.status(200).json({ message: 'Teacher removed from the class successfully',teacherId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});


router.post('/:classId/add-teachers', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  let { teachers } = req.body; // Accept teachers from the request body
  const classId = req.params.classId;

  try {
    // Validate classId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid class ID' });
    }

    // Ensure teachers is an array
    if (!Array.isArray(teachers)) {
      teachers = [teachers]; // Convert to array if it's a single value
    }

    const targetClass = await Classes.findById(classId);

    if (!targetClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if teachers array is empty
    if (teachers.length === 0) {
      return res.status(400).json({ message: 'No teachers provided' });
    }

    const addedTeachers = [];
    for (const teacherId of teachers) {
      // Validate teacherId
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        console.warn(`Invalid teacher ID: ${teacherId}`);
        continue;
      }

      const teacher = await User.findById(teacherId);
      if (teacher && teacher.role === 'teacher') {
        if (!targetClass.teachers.includes(teacherId)) {
          targetClass.teachers.push(teacherId);
          addedTeachers.push(teacher);

          if (!teacher.classes.includes(classId)) {
            await User.findByIdAndUpdate(
              teacherId,
              { $push: { classes: classId } },
              { new: true }
            );
          }
        }
      } else {
        console.warn(`User with ID ${teacherId} is not a teacher or does not exist`);
      }
    }

    await targetClass.save();
    res.status(200).json({ message: 'Teachers added successfully to the class', addedTeachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});




router.post('/:classId/add-students', authenticateUser, verifyRole(['admin', 'course_advisor']), async (req, res) => {
  let { students } = req.body; // Destructure students from request body
  const classId = req.params.classId;

  try {
      // Ensure students is an array
      if (!Array.isArray(students)) {
          if (typeof students === 'string') {
              students = [students]; // Wrap single student in an array
          } else {
              return res.status(400).json({ message: 'Invalid students data format' });
          }
      }

      // Find the class by ID
      const targetClass = await Classes.findById(classId);
      if (!targetClass) {
          return res.status(404).json({ message: 'Class not found' });
      }

      const addedStudents = [];
      for (const studentId of students) {
          // Validate ObjectId format
          if (!mongoose.Types.ObjectId.isValid(studentId)) {
              console.warn(`Invalid ObjectId format: ${studentId}`);
              continue;
          }

          // Check if the student exists
          const student = await Student.findById(studentId);
          if (student) {
              if (!targetClass.students.includes(studentId)) {
                  targetClass.students.push(studentId);
                  addedStudents.push(student);

                  // Add the class ID to the student's classes array
                  if (!student.classes.includes(classId)) {
                      await Student.findByIdAndUpdate(
                          studentId,
                          { $push: { classes: classId } },
                          { new: true }
                      );
                  }
              }
          } else {
              console.warn(`Student with ID ${studentId} not found`);
          }
      }

      // Save updated class
      await targetClass.save();

      res.status(200).json({
          message: 'Students added successfully to the class',
          addedStudents,
      });
  } catch (error) {
      console.error(error);
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
  try {
    let classes;

    if (req.user.role === 'admin' || req.user.role === 'course_advisor') {
      // For admin or course_advisor, retrieve all classes
      classes = await Classes.find()
        .populate('course', 'title')
        .populate('teachers', 'firstname lastname');
    } else if (req.user.role === 'teacher') {
      console.log('fetch teacher class');
      
      // Fetch user details to retrieve assigned class IDs for teacher
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Use the classes array from the User model to retrieve relevant classes
      classes = await Classes.find({ _id: { $in: user.classes } })
        .populate('course', 'title')
        .populate('teachers', 'firstname lastname');
    } else if (req.user.role === 'student') {
      // For student, retrieve classes based on their enrolled class IDs in the Student model
      const student = await Student.findById(req.user.userId).populate('classes');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      classes = await Classes.find({ _id: { $in: student.classes } })
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