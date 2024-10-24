const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware to verify roles (admin, course_advisor)
const verifyRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Access denied' });
  next();
};

// Create a new student account
router.post('/create-student', verifyRole(['admin', 'course_advisor']), async (req, res) => {
  const { firstname, lastname, email, password, courses } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new User({ firstname, lastname, email, password: hashedPassword, role: 'student', courses });
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Deactivate a student account
router.put('/:id/deactivate', verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Student account deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reactivate a student account
router.put('/:id/reactivate', verifyRole(['admin', 'course_advisor']), async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: true });
    res.json({ message: 'Student account reactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (Admin-only)
router.get('/', verifyRole(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
