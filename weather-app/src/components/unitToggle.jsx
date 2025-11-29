import React from 'react';

export default function UnitToggle({ unit, toggleUnit }) {
  return (
    <button 
      onClick={toggleUnit} 
      className="toggle-btn"
    >
        °{unit === 'imperial' ? 'F' : 'C'}
    </button>
  );
}