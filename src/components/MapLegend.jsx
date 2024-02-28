import React from 'react';

const MapLegend = () => {
    return (
      <div style={{ position: 'absolute', top: '100px', left: '10px', background: 'white', padding: '5px', border: '1px solid #ccc', zIndex: 3 }}>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgb(80, 92, 69)', marginRight: '5px', border: '0.5px solid black' }}></span>
          <p>1,000,000+</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgb(102, 117, 88)', marginRight: '5px', border: '0.5px solid black' }}></span>
          <p>100,001 - 1,000,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgb(123, 141, 106)', border: '0.5px solid black', marginRight: '5px' }}></span>
          <p>10,001 - 100,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgb(147, 168, 126)', border: '0.5px solid black', marginRight: '5px' }}></span>
          <p>1,001 - 10,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgb(169, 193, 145)', border: '0.5px solid black', marginRight: '5px' }}></span>
          <p>101 - 1,000</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgb(191, 218, 164)', border: '0.5px solid black', marginRight: '5px' }}></span>
          <p>11 - 100</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'rgb(212, 243, 183)', marginRight: '5px', border: '0.5px solid black' }}></span>
          <p>1 - 10</p>
        </div>
        <div>
          <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'white', marginRight: '5px', border: '0.5px solid black' }}></span>
          <p>0</p>
        </div>
      </div>
    );
  };


export default MapLegend;
