const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    materials: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Material' 
        }
    ],
    students: [
        { 
            type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        }
    ],
    duration: { 
        type: Number, 
        required: true 
    }, // In days
    startDate: { 
        type: Date, 
        default: Date.now 
    },
    endDate: { 
        type: Date 
    }, // Can be calculated from duration
  });
  

  module.exports = mongoose.model("Course", CourseSchema);