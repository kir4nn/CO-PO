const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const Test = require("./TestSchema"); // Replace with the actual file path where your Bill model is defined
const Department = require("./DeptSchema"); // Replace with the actual file path where your UserHistory model is defined
const Course = require('./CourseSchema');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyparser.json());

const PORT = 5000;

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


