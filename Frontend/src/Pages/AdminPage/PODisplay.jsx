import React, { useState, useEffect } from 'react';
import './PODisplay.css';

function PODisplay() {
  const [poData, setPOData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPOData = async () => {
      try {
        const response = await fetch('http://localhost:5001/calculatePO');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setPOData(result.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PO data');
        setLoading(false);
      }
    };

    fetchPOData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="PODisplay">
      <h2 className="text-2xl font-bold mb-4">Attained Program Outcomes</h2>
      {poData && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(poData).map(([po, value]) => (
            <div key={po} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{po}</h3>
              <p className="text-3xl font-bold text-blue-600">{value.toFixed(2)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PODisplay;