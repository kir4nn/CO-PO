import React from 'react';
import './PODisplay.css';

function PODisplay() {
  const pos = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PSO1', 'PSO2'];

  return (
    <div className="PODisplay">
      <h2>Attained Program Outcomes</h2>
      <ul>
        {pos.map((po) => (
          <li key={po}>{po}: {Math.floor(Math.random() * 100)}%</li>
        ))}
      </ul>
    </div>
  );
}

export default PODisplay;
