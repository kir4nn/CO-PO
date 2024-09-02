import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './CoursePage.css';
import CsvFileInput from './CSVFileInput';
import API from '../../middleware/APIService';
import { useParams } from 'react-router-dom';

function CoursePage() {
  const { courseId } = useParams(); 
  const [courses, setCourses] = useState([]);
  const [showCOPO, setShowCOPO] = useState(false);
  const [showAvgCO, setShowAvgCO] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', coAttainment: '' });
  const [copoMatrix, setCOPOMatrix] = useState([]);
  const [newCOPOEntry, setNewCOPOEntry] = useState({ co: '', po1: '', po2: '', po3: '' });
  
  const [csvData, setCsvData] = useState(null);
  const [testId, setTestId] = useState("")

  const [course, setCourse] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.getCourse(courseId);
        console.log('Course: ', res);
        setCourse(res);
      } catch (error) {
        console.log('[ERR] Unable to fetch course', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(()=>{
    console.log('CSV: ', csvData);
  }, [csvData])

  useEffect(()=>{
    console.log('TestId: ', testId)
  }, [testId])

  const handleFileUpload = (parsedData) => {
    console.log('Uploading File...');
    const formattedData = formatData(parsedData);
    console.log('Formatted Data:', formattedData);
    setCsvData(formattedData);
  };

  const formatData = (data) => {
    const formattedData = {
      courseId: course?.courseId,
      testId: testId,
      data: []
    };
  
    data.forEach((row, index) => {
      if (index === 0) {
        // If it's the header row, push the headers (excluding the first empty cell)
        formattedData.data.push(["", ...Object.values(row).slice(1)]);
      } else if (row[""] === "CO") {
        // If the first cell in the row is "CO", it's the CO row
        formattedData.data.push(["CO->", ...Object.values(row).slice(1)]);
      } else if (row[""] === "MaxMarks") {
        // If the first cell in the row is "MaxMarks", it's the MaxMarks row
        formattedData.data.push(["MaxMarks", ...Object.values(row).slice(1)]);
      } else if (row[""] && row[""] !== "USN") {
        // For student data rows, which have a USN in the first cell
        formattedData.data.push([row[""], ...Object.values(row).slice(1)]);
      }
    });
  
    return formattedData;
  };

  const submitTest = async() => {
    const data = csvData;
    data['testId'] = testId
    console.log('Submitting: ',data)
    try {
      const res = await API.addTest(data)
      console.log('Status:', res);
      if (res?.success) {
        alert('Test Added Successfully!');
       
        // Clear the form inputs
        setCsvData(null); // Clear the CSV data
        setTestId('');  
      }
    
    } catch (error) {
      console.log('[ERR]: Cannot Add Test', error)
    }
    

  }

  const calculateAverageCOAttainment = () => {
    if (!course) return 0;
    const attainments = [
      course.CO1_attainment,
      course.CO2_attainment,
      course.CO3_attainment,
      course.CO4_attainment
    ];
    const sum = attainments.reduce((acc, val) => acc + val, 0);
    return (sum / attainments.length).toFixed(2);
  };

  return (
    <div className="CoursePage">
      <h1 className="text-3xl font-bold dark:text-white">{course?.courseName} - {course?.courseId}</h1>

      <div className="">
        <h5 className="text-xl font-bold dark:text-white">Add New Test</h5>
        
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload CSV file</label>
          <CsvFileInput onFileLoad={handleFileUpload} />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="test_id">Test Id</label>
          <input
            id="test_id"
            value={testId}
            onChange={e => setTestId(e.target.value)}
            type="text"
            placeholder='Enter the test id'
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={submitTest}
          className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Test
        </button>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <button
        onClick={() => setShowCOPO(!showCOPO)}
        className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {showCOPO ? 'Hide CO-PO Conversion Matrix' : 'Show CO-PO Conversion Matrix'}
      </button>
      {showCOPO && course?.CO_PO_matrix && (
        <div className="copo-matrix">
          <h2 className="text-2xl font-bold mb-4">CO-PO Conversion Matrix</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  {course.CO_PO_matrix[0].map((header, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {course.CO_PO_matrix.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowAvgCO(!showAvgCO)}
        className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {showAvgCO ? 'Hide Average CO Attainment' : 'Show Average CO Attainment'}
      </button>
      {showAvgCO && course && (
        <div className="avg-co-attainment">
          <h2 className="text-2xl font-bold mb-4">CO Attainments</h2>
          <ul className="list-disc list-inside">
            <li>CO1: {course.CO1_attainment}</li>
            <li>CO2: {course.CO2_attainment}</li>
            <li>CO3: {course.CO3_attainment}</li>
            <li>CO4: {course.CO4_attainment}</li>
          </ul>
          <p className="mt-4 font-bold">Average CO Attainment: {calculateAverageCOAttainment()}</p>
        </div>
      )}
    </div>
  );
}

export default CoursePage;