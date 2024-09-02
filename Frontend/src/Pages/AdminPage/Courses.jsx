import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseForm.css';

const CoursesTable = () => {
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
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Operating Systems</th>
            <td className="px-6 py-4">22CSXXX</td>
            <td className="px-6 py-4">
              <Link to={`/admin/courses/${1234}`}>
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function Courses() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [clicked, setClicked] = useState(false);
  const [matrix, setMatrix] = useState([
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],]
      ); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Adding course:', { courseName, courseCode, matrix });
    setCourseName('');
    setCourseCode('');
    setMatrix([
      
    ]); // Reset matrix
  };

  const handleMatrixChange = (rowIndex, colIndex, value) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  return (
    <div className="px-5 w-fit max-w-screen-md">
      {!clicked && (
        <div className="py-5">
          <button type="submit" onClick={() => setClicked(true)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add Course
          </button>
        </div>
      )}
      <div>
        {clicked && (
          <div className='mb-10'>
            <h4 className="text-2xl font-bold dark:text-white">Add New Course</h4>
            <div className="py-5 pb-2 ">
              <div className='mb-4'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Code</label>
                <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Course Code" required />
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
                      {/* TODO: Make this table dynamic according to the data */}

                      <th> </th>
                      <th>PO1</th>
                      <th>PO2</th>
                      <th>PO3</th>
                      <th>PO4</th>
                      <th>PO5</th>
                      <th>PO6</th>
                      <th>PO7</th>
                      <th>PO8</th>
                      <th>PO9</th>
                      <th>PO10</th>
                      <th>PS01</th>
                      <th>PS02</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className='p-4'>CO{rowIndex + 1}</td>
                        {row.map((col, colIndex) => (
                          <td key={colIndex}>
                            <input
                              type="text"
                              value={col}
                              onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                              className="w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder={`PO${colIndex + 1}`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
            <button type="submit" onClick={handleSubmit} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Course</button>
            <button type="button" onClick={() => setClicked(false)} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
          </div>
        )}
        <CoursesTable />
      </div>
    </div>
  );
}

export default Courses;
