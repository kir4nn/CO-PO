import React, { useState, useEffect } from 'react';
import './CoursePage.css';

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [showCOPO, setShowCOPO] = useState(false);
  const [showAvgCO, setShowAvgCO] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', coAttainment: '' });
  const [copoMatrix, setCOPOMatrix] = useState([]);
  const [newCOPOEntry, setNewCOPOEntry] = useState({ co: '', po1: '', po2: '', po3: '' });

  useEffect(() => {
    // Fetch courses from backend
    fetchCourses();
    // Fetch CO-PO matrix from backend
    fetchCOPOMatrix();
  }, []);

  const fetchCourses = async () => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/courses');
    // const data = await response.json();
    // setCourses(data);
    
    // Placeholder data
    setCourses([
      { id: 1, name: 'Course 1', coAttainment: [80, 75, 90] },
      { id: 2, name: 'Course 2', coAttainment: [85, 88, 92] },
    ]);
  };

  const fetchCOPOMatrix = async () => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/copo-matrix');
    // const data = await response.json();
    // setCOPOMatrix(data);
    
    // Placeholder data
    setCOPOMatrix([
      { co: 'CO1', po1: 3, po2: 2, po3: 1 },
      { co: 'CO2', po1: 2, po2: 3, po3: 2 },
    ]);
  };

  const addCourse = async () => {
    const courseToAdd = {
      name: newCourse.name,
      coAttainment: newCourse.coAttainment.split(',').map(Number)
    };

    // TODO: Replace with actual API call
    // const response = await fetch('/api/courses', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(courseToAdd)
    // });
    // const addedCourse = await response.json();
    // setCourses([...courses, addedCourse]);

    // Placeholder action
    setCourses([...courses, { ...courseToAdd, id: courses.length + 1 }]);
    setNewCourse({ name: '', coAttainment: '' });
  };

  const addCOPOEntry = async () => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/copo-matrix', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newCOPOEntry)
    // });
    // const addedEntry = await response.json();
    // setCOPOMatrix([...copoMatrix, addedEntry]);

    // Placeholder action
    setCOPOMatrix([...copoMatrix, newCOPOEntry]);
    setNewCOPOEntry({ co: '', po1: '', po2: '', po3: '' });
  };

  const getAverageCO = (coAttainment) => {
    const total = coAttainment.reduce((sum, co) => sum + co, 0);
    return (total / coAttainment.length).toFixed(2);
  };

  return (
    <div className="CoursePage">
      <h1>Course Dashboard</h1>

      <div className="add-course">
        <h2>Add New Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="CO Attainment (comma-separated)"
          value={newCourse.coAttainment}
          onChange={(e) => setNewCourse({ ...newCourse, coAttainment: e.target.value })}
        />
        <button onClick={addCourse}>Add Course</button>
      </div>

      <div className="course-data">
        <h2>Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name} - Avg CO Attainment: {getAverageCO(course.coAttainment)}%
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setShowCOPO(!showCOPO)}>
        {showCOPO ? 'Hide CO-PO Conversion Matrix' : 'Show CO-PO Conversion Matrix'}
      </button>
      {showCOPO && (
        <div className="copo-matrix">
          <h2>CO-PO Conversion Matrix</h2>
          <table>
            <thead>
              <tr>
                <th>CO</th>
                <th>PO1</th>
                <th>PO2</th>
                <th>PO3</th>
              </tr>
            </thead>
            <tbody>
              {copoMatrix.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.co}</td>
                  <td>{entry.po1}</td>
                  <td>{entry.po2}</td>
                  <td>{entry.po3}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-copo-entry">
            <h3>Add New CO-PO Entry</h3>
            <input
              type="text"
              placeholder="CO"
              value={newCOPOEntry.co}
              onChange={(e) => setNewCOPOEntry({ ...newCOPOEntry, co: e.target.value })}
            />
            <input
              type="number"
              placeholder="PO1"
              value={newCOPOEntry.po1}
              onChange={(e) => setNewCOPOEntry({ ...newCOPOEntry, po1: e.target.value })}
            />
            <input
              type="number"
              placeholder="PO2"
              value={newCOPOEntry.po2}
              onChange={(e) => setNewCOPOEntry({ ...newCOPOEntry, po2: e.target.value })}
            />
            <input
              type="number"
              placeholder="PO3"
              value={newCOPOEntry.po3}
              onChange={(e) => setNewCOPOEntry({ ...newCOPOEntry, po3: e.target.value })}
            />
            <button onClick={addCOPOEntry}>Add Entry</button>
          </div>
        </div>
      )}

      <button onClick={() => setShowAvgCO(!showAvgCO)}>
        {showAvgCO ? 'Hide Average CO Attainment' : 'Show Average CO Attainment'}
      </button>
      {showAvgCO && (
        <div className="avg-co-attainment">
          <h2>Average CO Attainment</h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                {course.name} - {getAverageCO(course.coAttainment)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CoursePage;