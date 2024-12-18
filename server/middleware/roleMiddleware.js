const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        
      try {
        // Extract the user role from the decoded token attached to req.user
        const userRole = req.user.role;
        console.log('rolling', allowedRoles);
  
        // Check if the user's role is in the allowedRoles array
        if (!allowedRoles.includes(userRole)) {
          console.log('Access denied: You do not have the required permissions.');
          
          return res.status(403).json({ message: 'Access denied: You do not have the required permissions.' });
        }
  
        // Proceed if the role is allowed
        console.log('allowed');
        
        next();
      } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server error', error });
      }
    };
  };
  
  module.exports = verifyRole;
  