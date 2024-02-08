import React from 'react';
import MapComponent from './components/MapComponent';
import RangeSlider from './components/RangeSlider';

function App() {
  return (
    <div id="app">
      <div style={{ height: '9.5vh' }}>
        <p id="titleText">UNITED STATES BORDER PATROL NATIONWIDE APPREHENSIONS BY CITIZENSHIP</p>
        <RangeSlider />
      </div>
      <MapComponent />
      <footer style={{ height: '20px' }}>
        Nick Hoefle
      </footer>
    </div>
  );
}

export default App;
