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
  
testSchema.pre('save', function(next){
    console.log("Starting pre-save middleware");
  
  const numRows = this.data.length;
  if (numRows <= 3) return next(new Error('Data must contain at least three row'));

  const numCols = this.data[0].length;
  if (numCols < 2) return next(new Error('Data must contain more than two columns'));
  
  const coStats = {
    CO1: { maxMarks: 0, avgAttainment: 0 },
    CO2: { maxMarks: 0, avgAttainment: 0 },
    CO3: { maxMarks: 0, avgAttainment: 0 },
    CO4: { maxMarks: 0, avgAttainment: 0 }
  };

  for(let j=1; j < numCols; j++) //iterate thru columns
  {
    let x = this.data[1][j]  //tells CO number
    let coKey = `CO${x}`;    
    //account for the fact that it might already be calculated by previous column
    let total = coStats[coKey].maxMarks * coStats[coKey].avgAttainment * (numRows-3);  
    coStats[coKey].maxMarks += this.data[2][j];
    for(let i = 3; i<numRows ; i++)
        total+= this.data[i][j];

    coStats[coKey].avgAttainment = total / ((numRows-3)*coStats[coKey].maxMarks);
  }

  for(let co in coStats){
    this[co] = {
        avgAttainment : coStats[co].avgAttainment,
        maxMarks: coStats[co].maxMarks
    }
  }
  next();
});

module.exports = mongoose.model('Test', testSchema);