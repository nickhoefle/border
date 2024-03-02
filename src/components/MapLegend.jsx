import { useState } from "react";

const MapLegend = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleLegend = () => {
    setCollapsed(!collapsed);
  };

    return (
      <div 
        id='legendWrapper'
        className={collapsed ? 'collapsed' : ''}
      >
        <div 
          id='legendHeaderWrapper'
          onClick={toggleLegend}
        >
          <span id='legendToggleIcon'>{collapsed ? '☰' : '✕'}</span>
          <p id='legendText'>Legend</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'rgb(80, 92, 69)' }}
            className='colorSplotch'
          ></span>
          <p>1,000,000+</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'rgb(102, 117, 88)' }}
            className='colorSplotch'
          ></span>
          <p>100,001 - 1,000,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'rgb(123, 141, 106)' }}
            className='colorSplotch'
          ></span>
          <p>10,001 - 100,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'rgb(147, 168, 126)' }}
            className='colorSplotch'
          ></span>
          <p>1,001 - 10,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'rgb(169, 193, 145)' }}
            className='colorSplotch'
          ></span>
          <p>101 - 1,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'rgb(191, 218, 164)' }}
            className='colorSplotch'
          ></span>
          <p>11 - 100</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'rgb(212, 243, 183)' }}
            className='colorSplotch'
          ></span>
          <p>1 - 10</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'white' }}
            className='colorSplotch'
          ></span>
          <p>0</p>
        </div>
      </div>
    );
  };


export default MapLegend;
