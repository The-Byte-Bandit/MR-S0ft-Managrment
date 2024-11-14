require('dotenv').config();
const jwt = require('jsonwebtoken');
const Student = require('../models/student'); // Assuming you have a Student model

const authenticateUser = async (req, res, next) => {
  console.log('authing');

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    console.log('student', req.header('Authorization'));
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assuming the token contains user info, including the role

    // Additional check for student role
    if (req.user.role === 'student') {
      const student = await Student.findById(req.user.userId);
      
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Check if the endDate has passed
      if (student.endDate && new Date(student.endDate) < new Date()) {
        // Deactivate the student's account
        student.isActive = false;
        await student.save();

        return res.status(403).json({ message: 'Account deactivated due to users account expiry expiry' });
      }

      // Check if the student's account is active
      if (!student.isActive) {
        return res.status(403).json({ message: 'Account is deactivated' });
      }
    }

    console.log('next');
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token is not valid', error });
  }
};

module.exports = authenticateUser;
