import React from 'react';
import MapComponent from './components/MapComponent';
import RangeSlider from './components/RangeSlider';

function App() {
  return (
    <div className="App">
      <div id="yearSliderWrapper">
        <RangeSlider />
      </div>
      <MapComponent />
    </div>
  );
}

export default App;
