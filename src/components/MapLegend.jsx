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
            style={{ backgroundColor: switchOn ? 'rgb(177, 180, 168)' : 'rgb(80, 92, 69)' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">1,000,000+</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(186, 190, 175)' : 'rgb(102, 117, 88)' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">100,001 - 1,000,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(194, 199, 182)' : 'rgb(123, 141, 106)' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">10,001 - 100,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(204, 210, 190)' : 'rgb(147, 168, 126)' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">1,001 - 10,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(213, 223, 191)' : 'rgb(169, 193, 145)' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">101 - 1,000</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(221, 230, 206)' : 'rgb(191, 218, 164)' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">11 - 100</p>
        </div>
        <div className='splotchAndTextWrapper'>
          <span 
            style={{ backgroundColor: switchOn ? 'rgb(230, 240, 213)' : 'rgb(212, 243, 183)' }}
            className='colorSplotch'
          ></span>
          <p className="legendLabel">1 - 10</p>
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
