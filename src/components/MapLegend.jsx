import { useState } from "react";

const MapLegend = ({ switchOn }) => {
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
            style={{ backgroundColor: switchOn ? 'rgb(177, 180, 168)' : '#1D2C17' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">1,000,000+</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(186, 190, 175)' : '#3E5631' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">100,001 - 1,000,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(194, 199, 182)' : '#5F804B' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">10,001 - 100,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(204, 210, 190)' : '#81AB64' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">1,001 - 10,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(213, 223, 191)' : '#A2D57E' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">101 - 1,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(221, 230, 206)' : '#C3FF98' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">1 - 100</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: 'white' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">0</p>
        </div>
      </div>
    );
  };

export default MapLegend;
