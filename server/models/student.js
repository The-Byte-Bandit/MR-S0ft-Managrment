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
  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String 
  },
  qualification: { 
    type: String 
  },
  classes: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Classes' 
    }
  ],
  duration: { 
    type: String 
  },
  trainingFee: { 
    type: Number 
  },
  amountPaid: { 
    type: Number 
  },
  balance: { 
    type: Number 
  },
  guardianName: { 
    type: String 
  },
  guardianRelationship: { 
    type: String 
  },
  guardianPhone: { 
    type: String 
  },
  counselor: { 
    type: String 
  },
  startDate: { 
    type: Date 
  },
  endDate: { 
    type: Date 
  },
  remark: { 
    type: String 
  },
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
  returnDate: {
    type: Date,
    default: null
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Student", StudentSchema);
