import React from "react";
import Papa from "papaparse";

const CsvFileInput = ({ onFileLoad }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onload = (event) => {
        console.log('File content:', event.target.result);
        
        Papa.parse(event.target.result, {
          complete: (result) => {
            onFileLoad(result.data); // Pass parsed data to parent component
          },
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsText(file);
    } else {
      console.error('Selected file is not a valid Blob.');
    }
  };

  return (
    <div>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        onChange={handleFileChange}
        accept=".csv"
      />
    </div>
  );
};

export default CsvFileInput;
