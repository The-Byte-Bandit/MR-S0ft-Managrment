const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    materials: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Material' 
        }
    ],
    duration: { 
        type: Number, 
        // required: true 
    }, 
    startDate: { 
        type: Date, 
        default: Date.now ,
        // required: true 
    },
    endDate: { 
        type: Date,
        // required: true 
    }, 
  });
  

  module.exports = mongoose.model("Course", CourseSchema);
