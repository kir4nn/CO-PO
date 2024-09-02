import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../middleware/APIService';
import axios from 'axios';
import './CourseForm.css';

const CoursesTable = ({courses}) => {

  

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Course Name</th>
            <th scope="col" className="px-6 py-3">Course Code</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>

          {
            courses?.map(item => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.courseName}</th>
                <td className="px-6 py-4">{item?.courseId}</td>
                <td className="px-6 py-4">
                  <Link to={`/admin/courses/${item?.courseId}`}>
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                  </Link>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  );
};

function Courses() {
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [clicked, setClicked] = useState(false);
  const [matrix, setMatrix] = useState([
    ["", "PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PSO1", "PSO2"],
    ["CO1", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["CO2", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["CO3", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["CO4", "", "", "", "", "", "", "", "", "", "", "", ""],
  ]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetch = async() => {
      try {   
        const res = await API.getCourses();
        console.log('Courses: ', res.data)
        setCourses(res.data)
      } catch (error) {
        console.log('[ERR] Unable to fetch courses', error)
      }
    } 
    fetch()
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      console.log('Sending request to add course...');
      
      // Format the matrix data
      const formattedMatrix = matrix.map(row => 
        row.map((cell, index) => index === 0 ? cell : parseInt(cell) || 0)
      );

      const response = await API.addCourse( {
        courseName,
        courseId,
        CO_PO_matrix: formattedMatrix
      })
      
      console.log('Course added successfully:', response.data);
      setSuccessMessage('Course added successfully!');
      setCourseName('');
      setCourseId('');
      setMatrix([
        ["", "PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PSO1", "PSO2"],
        ["CO1", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["CO2", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["CO3", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["CO4", "", "", "", "", "", "", "", "", "", "", "", ""],
      ]);
      setClicked(false);
    } catch (error) {
      console.error('Error adding course:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the course');
    }
  };

  const handleMatrixChange = (rowIndex, colIndex, value) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  return (
    <div className="px-5 w-fit max-w-screen-md">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {!clicked && (
        <div className="py-5">
          <button type="button" onClick={() => setClicked(true)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add Course
          </button>
        </div>
      )}
      <div>
        {clicked && (
          <div className='mb-10'>
            <h4 className="text-2xl font-bold dark:text-white">Add New Course</h4>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course ID</label>
                <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Course ID" required />
              </div>
              <div className='mb-4'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
                <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Course Name" required />
              </div>
              <div className='py-5 '>
                <label className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">CO-PO Matrix</label>
                <div className='overflow-hidden overflow-x-scroll'>
                  <table className="w-full mb-4 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead>
                      <tr>
                        {matrix[0].map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, colIndex) => (
                            <td key={colIndex}>
                              {colIndex === 0 ? (
                                cell
                              ) : (
                                <input
                                  type="number"
                                  min="0"
                                  max="3"
                                  value={cell}
                                  onChange={(e) => handleMatrixChange(rowIndex + 1, colIndex, e.target.value)}
                                  className="w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <button type="submit" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Course</button>
              <button type="button" onClick={() => setClicked(false)} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
            </form>
          </div>
        )}
        <CoursesTable courses={courses}/>
      </div>
    </div>
  );
}

export default Courses;