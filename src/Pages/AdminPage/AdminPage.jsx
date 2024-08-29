import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import BulkStudentUpload from './BulkStudentUpload';
import CourseForm from './Courses';
import PODisplay from './PODisplay';
import './AdminPage.css';
import { Sidebar } from '../../Components';

function AdminPage() {
  return (
    <div className="p-10">
      {/* <Sidebar/> */}
      <div>
      <h1 className="text-3xl font-bold dark:text-white">Admin Dashboard</h1>

      <div className='py-10 flex '>
        <div className="p-5 w-[400px]">
          {/* <Link to="/admin/bulk-upload">Bulk Student Upload</Link> */}
          <Link to="/admin/courses" className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Manage Courses</Link>
          <Link to="/admin/display-po" className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Display PO</Link>
        </div>
        <Outlet/>
        {/* <Routes>
          <Route path="bulk-upload" element={<BulkStudentUpload />} />
          <Route path="add-course" element={<CourseForm />} />
          <Route path="display-po" element={<PODisplay />} />
        </Routes> */}
        </div>
      </div>
      
    </div>
  );
}

export default AdminPage;