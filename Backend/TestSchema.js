const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    courseId: {
      type: String,  // Course ID
      required: true
    },
    testId: {
      type: String,  // Test ID
      required: true
    },
    data: {
      type: [[mongoose.Schema.Types.Mixed]],  // 2D array (matrix) containing mixed types (strings and numbers)
      required: true
    },
    CO1: {
      avgAttainment: Number,  // Calculated field
      maxMarks: Number       // Calculated field
    },
    CO2: {
    avgAttainment: Number,  // Calculated field
      maxMarks: Number       // Calculated field
    },
    CO3: {
        avgAttainment: Number,  // Calculated field
      maxMarks: Number       // Calculated field
    },
    CO4: {
        avgAttainment: Number,  // Calculated field
      maxMarks: Number       // Calculated field
    }
  });
  
module.exports = mongoose.model('Test', testSchema);