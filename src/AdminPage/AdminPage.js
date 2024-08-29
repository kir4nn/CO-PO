import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import BulkStudentUpload from './BulkStudentUpload';
import CourseForm from './CourseForm';
import PODisplay from './PODisplay';
import './AdminPage.css';

function AdminPage() {
  return (
    <div className="AdminPage">
      <h1>Admin Dashboard</h1>
      <div className="admin-buttons">
        {/* <Link to="/admin/bulk-upload">Bulk Student Upload</Link> */}
        <Link to="/admin/add-course">Add Course</Link>
        <Link to="/admin/display-po">Display PO</Link>
      </div>
      <Routes>
        <Route path="bulk-upload" element={<BulkStudentUpload />} />
        <Route path="add-course" element={<CourseForm />} />
        <Route path="display-po" element={<PODisplay />} />
      </Routes>
    </div>
  );
}

export default AdminPage;