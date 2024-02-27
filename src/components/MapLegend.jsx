import React from 'react';

const MapLegend = () => {
    return (
      <div style={{ position: 'absolute', top: '100px', left: '10px', background: 'white', padding: '5px', border: '1px solid #ccc', zIndex: 3 }}>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 1)', marginRight: '5px' }}></span>
          <p>1,000,000+</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 0.85)', marginRight: '5px' }}></span>
          <p>100,001 - 1,000,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 0.70)', marginRight: '5px' }}></span>
          <p>10,001 - 100,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 0.55)', marginRight: '5px' }}></span>
          <p>1,001 - 10,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 0.40)', marginRight: '5px' }}></span>
          <p>101 - 1,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 0.25)', marginRight: '5px' }}></span>
          <p>11 - 100</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 0.10)', marginRight: '5px' }}></span>
          <p>1 - 10</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgba(0, 128, 0, 0.0)', marginRight: '5px' }}></span>
          <p>0</p>
        </div>
      </div>
    );
  };


export default MapLegend;
