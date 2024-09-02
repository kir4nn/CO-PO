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

              <Route path="courses/:courseId" element={<CoursePage/>}/>
              <Route path="display-po" element={<PODisplay />} />
          </Route>
          <Route path="/course" element={<CoursePage/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;