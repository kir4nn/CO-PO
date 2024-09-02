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
    const fetch = async() => {

      try {
        const res = await API.getCourse(courseId)
        console.log('Course: ', res)
        setCourse(res)
      } catch (error) {
        console.log('[ERR] Unable to fetch course')
      }
      
    }

    fetch()
  }, []);

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

  const addCourse = async (data) => {
    try {
    
    } catch (error) {
      
    }
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
      <h1 className="text-3xl font-bold dark:text-white">{course?.courseName} - {course?.courseId}</h1>



      <div className="">
      <h5 class="text-xl font-bold dark:text-white">Add New Test</h5>
       
       <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload CSV file</label>
        <CsvFileInput onFileLoad={handleFileUpload} />
       </div>
       <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Test Id</label>
        <input value={testId} onChange={e => setTestId(e.target.value)} type="text" placeholder='Enter the test id' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
       </div>



       <button type="button" onClick={submitTest} class="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
       Add Test
       </button>
      </div>

      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* <div className="course-data">
        <h2>Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name} - Avg CO Attainment: {getAverageCO(course.coAttainment)}%
            </li>
          ))}
        </ul>
      </div> */}

      <button onClick={() => setShowCOPO(!showCOPO)} className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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

      <button onClick={() => setShowAvgCO(!showAvgCO)} className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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