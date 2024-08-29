import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';

import './App.css';
import { Navbar } from './Components';
import { AdminPage, CoursePage, BulkStudentUpload, Courses, PODisplay, AddCourse } from './Pages';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<AdminPage/>}>
          </Route>

          <Route path="/admin" element={<AdminPage/>}>
              {/* <Route path="bulk-upload" element={<BulkStudentUpload />} /> */}
              <Route path="courses" element={<Courses />}/>

              <Route path="courses/:courseID" element={<CoursePage/>}/>
              <Route path="display-po" element={<PODisplay />} />
          </Route>
          <Route path="/course" element={<CoursePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      {/* <h1>CO-PO Calculation for 2024 Batch</h1> */}
      <div className="card">
        <nav>
          <ul>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
            <li>
              <Link to="/course">Course Page</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;