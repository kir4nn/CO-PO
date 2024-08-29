import React, { useState } from 'react';
import './BulkStudentUpload.css';

const BulkStudentUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Implement file upload logic here
    console.log('Uploading file:', file);
  };

  return (
    <div className="BulkStudentUpload">
      <h2>Add Students in Bulk</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default BulkStudentUpload;
