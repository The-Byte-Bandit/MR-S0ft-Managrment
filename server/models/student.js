const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstname: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['student'], 
    required: true 
  },
  classes: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Class' 
    }
  ],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isDeferred: { 
    type: Boolean, 
    default: false 
  },
  deferReason: { 
    type: String, 
    default: null 
  },
  defermentDate: { 
    type: Date, 
    default: null 
  },
  returnDate:{
    type:Date,
    default: null
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Student", StudentSchema);
