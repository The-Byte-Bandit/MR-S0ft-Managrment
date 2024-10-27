const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  email: 
  { type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['teacher', 'admin', 'course_advisor'], 
    required: true 
  },
  classes: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Class' }
    ],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("User", UserSchema);
