import React, { useState } from 'react';
import API from '../middleware/APIService';
import './CourseForm.css';

function CourseForm() {
  const [courseName, setCourseName] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Implement course addition logic here
    console.log('Adding course:', courseName);
    // const data = await API.addCourse();
    setCourseName('');
  };

  return (
    <div className="CourseForm">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
          required
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default CourseForm;
