const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['pdf', 'youtube'], 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  }, 
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  uploadedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  uploadedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Material', MaterialSchema);
