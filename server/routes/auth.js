require('dotenv').config();
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');
// const Admin = require('../models/admin');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');

// const costFactor = 10;
//                                      //USER ROUTES
// // SIGN UP Route
// router.post('/user/signup', async (req, res) => {

//     try {
//       const { username, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newUser = new User({
//         username,
//         email,
//         password: hashedPassword,
//         courses: []
//       });
  
//       const savedUser = await newUser.save();
//       console.log('====================================');
//       console.log(savedUser);
//       console.log('====================================');

//       const accessToken = jwt.sign({
//         id: savedUser._id,
//         isAdmin: savedUser.isAdmin,
//       },
//       process.env.JWT_SEC,
//       {expiresIn: "3d"}
//     )
  
//       res.status(200).json({
//         user:{
//           username: savedUser.username,
//           email: savedUser.email,
//           token: accessToken,
//           userId: savedUser._id,
//           result: savedUser.courses,
//           courses:savedUser.courses,
//         },
//         message: 'User registered successfully',
  
//       });

//     } catch (error) {
//         // console.log(error);
        
//       res.status(500).json({ message: 'Error registering user', error });
//     }
//   });
  
//   // LOGIN Route
//   router.post('/user/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       // console.log(email, password, 'this');
      
  
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//       }
  
//       const token = jwt.sign({ 
//         id: user._id,
//         isAdmin: user.isAdmin 
//     }, 
//     process.env.JWT_SEC, {
//     expiresIn: '1d',
//       });
//       console.log('Login successful');

      
  
//       res.status(200).json({ message: 'Login successful',user:{
//         username: user.username,
//         email: user.email,
//         token: token,
//         userId: user._id,
//         result: user.courses,
//         courses:user.courses,
//       }, });
//     } catch (error) {
//       console.log('Login error', error);
//       res.status(500).json({ message: 'Error logging in', error });
//     }
//   });


// router.post('/admin/signup', async (req, res) => {
    
//     try {
//       const { username, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newAdmin = new Admin({
//         username,
//         email,
//         password: hashedPassword,
//       });
  
//       const savedAdmin = await newAdmin.save();

//       const accessToken = jwt.sign({
//         id: savedAdmin._id,
//         isAdmin: savedAdmin.isAdmin,
//       },
//       process.env.JWT_SEC,
//       {expiresIn: "3d"}
//     )
  
//       res.status(200).json({
//         username: savedAdmin.username,
//         email: savedAdmin.email,
//         token: accessToken,
//         userId: savedAdmin._id,
//         message: 'Admin registered successfully',
  
//       });

//     } catch (error) {
//         console.log(error);
        
//       res.status(500).json({ message: 'Error registering Admin', error });
//     }
//   });


// router.post('/admin/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // const {password, ...others} = admin._doc

//         const token = jwt.sign({ 
//             id: admin._id,
//             isAdmin: admin.isAdmin 
//         }, 
//         process.env.JWT_SEC, {
//         expiresIn: '1d',
//         });
  
//       res.status(200).json({ message: 'Login successful', token:token });
//     } catch (error) {
//       res.status(500).json({ message: 'Error logging in', error });
//     }
//   });

// module.exports = router;



const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const Student = require('../models/student');

// Register a new user (without password encryption)
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User with this email already exists' });

    // Save password as plain text (NOT RECOMMENDED)
    const newUser = new User({ firstname, lastname, email, password, role });
    await newUser.save();

    const accessToken = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        token: accessToken,
        userId: newUser._id,
        role: newUser.role
      },
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login (without password encryption check)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, email, password);

  try {
    // Try to find the user in the Student collection first
    let user = await Student.findOne({ email });

    // If not found in Student, try to find in User collection
    if (!user) {
      user = await User.findOne({ email });
    }

    // If user is not found in both collections, return an error
    if (!user) {
      console.log('Invalid email or password');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the user is a Student and their endDate has passed
    if (user instanceof Student && user.endDate && new Date(user.endDate) < new Date()) {
      // Deactivate the account
      user.isActive = false;
      await user.save();

      console.log('Account deactivated due to endDate expiry');
      return res.status(403).json({ message: 'Account deactivated due to  users account expiry' });
    }

    // Check if the user's account is active
    if (user.isActive === false) {
      console.log('Account deactivated');
      return res.status(403).json({ message: 'Account deactivated' });
    }

    // Check if the password matches
    if (user.password !== password) {
      console.log('Invalid email or password');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Include endDate in the JWT payload if the user is a Student
    const tokenPayload = {
      userId: user._id,
      role: user.role,
    };

    if (user instanceof Student) {
      tokenPayload.endDate = user.endDate;
    }

    // Generate JWT token
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with the token and user details
    res.json({ 
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        userId: user._id,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Password reset (customize as needed)
router.post('/reset-password', async (req, res) => {
  // Implement password reset logic here
});

module.exports = router;