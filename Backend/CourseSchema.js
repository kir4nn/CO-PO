const mongoose = require('mongoose');
const Test = require("./TestSchema"); 

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
  PO_mapping : [Number],
  tests: [{
    type: mongoose.Schema.Types.ObjectId,  // Array of references to 'Test' documents
    ref: 'Test'
  }]
});

courseSchema.pre('save', function(next){  //computes average CO - average PO mapping coefficients
    console.log("Starting pre-save middleware to calculate avg POs");

    if(!this.PO_mapping || this.PO_mapping.length === 0 ){ //compute if not already computed
        for(let i = 1; i<this.CO_PO_matrix[0].length; i++){
            let avg = 0;
            for(let j = 1; j<this.CO_PO_matrix.length; j++)
                avg+= this.CO_PO_matrix[j][i];
            avg /= (this.CO_PO_matrix.length-1);
            this.PO_mapping[i-1] = avg;
        }
    }
    next();
});

courseSchema.pre('save',async function(next){
    console.log("Starting pre-save middleware to calcualate average per-CO attainment from Test Data");
    for(let i = 0; i<this.tests.length; i++){
        temp_id = this.tests[i];
        const data = await Test.findById(temp_id);
        for(let j=1; j<=4; j++){
            this[`CO${j}_attainment`]+= data[`CO${j}`].avgAttainment;
            console.log(this[`CO${j}_attainment`]);
        }
    }
    for(let j=1; j<=4; j++){
        this[`CO${j}_attainment`] /= this.tests.length;
    }
    next();
});

// Create a model for the schema
module.exports = mongoose.model('Course', courseSchema);
