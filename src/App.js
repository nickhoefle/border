import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JSONData from './components/JSONData'
import MapComponent from './components/MapComponent';
import RangeSlider from './components/RangeSlider';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route
          path="/jsondata"
          element={
            <JSONData />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
