const mongoose = require('mongoose');

// Define schema for the 'Course' collection
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,  // Course Name
    required: true
  },
  courseId: {
    type: String,  // Course ID
    required: true,
    unique: true   // Ensure unique Course ID
  },
  CO1_attainment: {
    type: Number,  // Double (floating-point number)
    default: null  // Not required at creation, default to null
  },
  CO2_attainment: {
    type: Number,  // Double (floating-point number)
    default: null  // Not required at creation, default to null
  },
  CO3_attainment: {
    type: Number,  // Double (floating-point number)
    default: null  // Not required at creation, default to null
  },
  CO4_attainment: {
    type: Number,  // Double (floating-point number)
    default: null  // Not required at creation, default to null
  },
  CO_PO_matrix: {
    type: [[mongoose.Schema.Types.Mixed]],  // 2D array (matrix) containing mixed types (strings and numbers)
    required: true
  },
  tests: [{
    type: mongoose.Schema.Types.ObjectId,  // Array of references to 'Test' documents
    ref: 'Test'
  }]
});

// Create a model for the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
