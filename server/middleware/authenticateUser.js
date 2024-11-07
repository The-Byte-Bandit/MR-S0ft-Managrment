require('dotenv').config();

// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided, authorization denied' });
//   }

//   try {
//     // Verify the token and decode it
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Attach the decoded token (which includes the user role) to req.user
//     req.user = decoded;
    
//     // Proceed to the next middleware/route handler
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authenticateUser;


const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
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
    console.log('next')
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    
    res.status(401).json({ message: 'Token is not valid', error});
  }
};

module.exports = authenticateUser;
