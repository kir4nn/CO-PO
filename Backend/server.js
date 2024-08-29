const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Test = require("./TestSchema"); // Replace with the actual file path where your Bill model is defined
const Department = require("./DeptSchema"); // Replace with the actual file path where your UserHistory model is defined
const Course = require('./CourseSchema');

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyparser.json());

const PORT = 5000;

app.listen(PORT, () => console.log(`Hello World ${PORT}`));

app.get('/sayHi', (req, res) => {
    res.json({"data":"Hi"});
});
