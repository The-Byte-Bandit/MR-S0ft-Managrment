require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.token;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    console.log(req.user, 'Token verified');
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token' });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};


const verifyTokenAndAuthorizationUser = (req, res, next) => {
  verifyToken(req, res, () => {
    const userIdFromToken = req.user.id; 
    const userIdFromBody = req.body.userId || req.query.userId; 

    console.log('Token user ID:', userIdFromToken, 'Request user ID:', userIdFromBody);

    if (userIdFromToken === userIdFromBody || req.user.isAdmin) {
      console.log('User authorized');
      next(); 
    } else {
      console.log('You are not authorized for this action');
      return res.status(403).json({ message: 'You are not authorized for this action' });
    }
  });
};


const verifyTokenAndAuthorizationAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'Admin access required' });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorizationUser, verifyTokenAndAuthorizationAdmin }; // Proper export
