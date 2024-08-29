const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
    PO1: Number,
    PO2: Number,
    PO3: Number,
    PO4: Number,
    PO5: Number,
    PO6: Number,
    PO7: Number,
    PO8: Number,
    PO9: Number,
    PO10: Number,
    PSO1: Number,
    PSO2: Number,
  });
  
module.exports = mongoose.model('Department', deptSchema);