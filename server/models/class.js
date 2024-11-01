const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course', 
      required: true 
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Ensure this is correctly set to your User model
      }
    ],
    students: [
        { 
            type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        }
    ],
    isActive: { 
      type: Boolean, 
      default: true 
    },
    isOngoing: { 
      type: Boolean, 
      default: false 
    },
    duration: { 
        type: Number 
    }, 
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    }
  });
  
  module.exports = mongoose.model("Classes", ClassSchema);