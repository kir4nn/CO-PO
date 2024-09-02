const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const Test = require("./TestSchema"); 
const Department = require("./DeptSchema"); 
const Course = require('./CourseSchema');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyparser.json());

const PORT = process.env.LOCAL_PORT || 5000;

app.listen(PORT, () => console.log(`Hello World ${PORT}`));

app.get('/sayHi', (req, res) => {
    res.json({"data":"Hi"});
});

app.post('/addCourse', async (req, res) => {
    const { courseName, courseId, CO_PO_matrix } = req.body;  
    if (!courseName || !courseId || !CO_PO_matrix) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

// Validate CO_PO_matrix
if (!Array.isArray(CO_PO_matrix) || CO_PO_matrix.length !== 5) {
    return res.status(400).json({ error: 'CO_PO_matrix must be a 5x13 matrix' });
  }

  // Check if each row has exactly 13 columns
  for (const row of CO_PO_matrix) {
    if (!Array.isArray(row) || row.length !== 13) {
      return res.status(400).json({ error: 'CO_PO_matrix must be a 5x13 matrix' });
    }
  }

  // Validate entries (excluding the first row and first column)
  for (let i = 1; i < CO_PO_matrix.length; i++) { // Skip the first row
    for (let j = 1; j < CO_PO_matrix[i].length; j++) { // Skip the first column
      const entry = CO_PO_matrix[i][j];
      if (!Number.isInteger(entry) || entry < 0 || entry > 3) {
        return res.status(400).json({ error: 'Matrix entries must be integers between 0 and 3, excluding the first row and column' });
      }
    }
  }

  try {
      const newCourse = new Course({
        courseName,
        courseId,
        CO_PO_matrix
      });
      await newCourse.save();
      res.status(201).json({ message: 'Course added successfully', course: newCourse });
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.post('/addTest', async (req, res) => {
    const { courseId, testId, data } = req.body;  
   if (!courseId || !testId || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Validate data (assuming it's a 2D array)
    if (!Array.isArray(data) || !data.every(row => Array.isArray(row))) {
      return res.status(400).json({ error: 'Data must be a 2D array' });
    }  
    let numCols = data[0].length
    for (const row of data) {
        if (row.length !== numCols) {
          return res.status(400).json({error: 'Data must be a rectangular matrix'});
        }
    }

    try {
      const newTest = new Test({
        courseId,
        testId,
        data
      });
      // Save the document (triggers the pre-save middleware)
      const savedTest = await newTest.save();

      const course = await Course.findOne({ courseId });
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      course.tests.push(savedTest._id);
      await course.save();

      res.status(201).json({ success: true, message: 'Test added successfully && course data updated', test: newTest });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/calculatePO', async (req,res)=> {
   // const {DeptCode} = req.body; //refer to CS dept usually
   // console.log(DeptCode);
    try{
    const courses = await Course.find(); // Fetch all courses from the database

    /*
    const department = await Department.findOneAndUpdate(
        { DeptCode: DeptCode },
        { new: true, upsert: true } // Create if not exists, return the updated document
      );
      */
    PO_arr = [0,0,0,0,0,0,0,0,0,0,0,0]; //array of 12 integers
    PO_denominator = [0,0,0,0,0,0,0,0,0,0,0,0];
    courses.forEach(course=> {
//        console.log(course);
        let avg = (course.CO1_attainment+course.CO2_attainment+course.CO3_attainment+course.CO4_attainment)/4;
        console.log(avg);
        for(let i=0; i<PO_arr.length; i++){
            PO_arr[i] += course.PO_mapping[i] * avg;
            PO_denominator[i] += course.PO_mapping[i];
        }
    });
    let document = {};
    for(let i=0; i<12; i++)
        if(i<10)
            document[`PO${i+1}`] = PO_arr[i] / PO_denominator[i];
        else
            document[`PSO${i%10+1}`] = PO_arr[i]/PO_denominator[i];
    
    for(const key in document){
        document[key] = parseFloat((document[key]*100).toFixed(2));
    }
    res.status(201).json({ message: 'PO computed', data: document });
    }
    catch(err){
        res.status(500).json({ error: err.message });     
    }
});

app.get('/getAllCourses', async (req,res)=> {
  
  console.log('[INFO] GET request at /getAllCourses')

  try{
    const courses = await Course.find();
    res.status(201).json({data: courses});
  }
  catch (err){
    res.status(500).json({error: err.message});
  }
  
});

app.get('/getCourse', async(req, res) => {
  console.log('[INFO] GET request at /getCourse') 

  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: 'Course ID is required' });
  }

  try {
    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'An error occurred while fetching the course' });
  }
})