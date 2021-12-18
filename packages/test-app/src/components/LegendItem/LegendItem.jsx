import React from 'react';

export const LegendItem = ({ label, color }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '15px', height: '15px', backgroundColor: color }} />
      <div style={{ marginLeft: '5px'}}>= {label}</div>
    </div>
  )
}