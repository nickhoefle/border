import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JSONData from './components/JSONData'
import Footer from './components/Footer'
import RangeSlider from './components/RangeSlider';
import CSVData from './components/CSVData';

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
              <footer id="footerContainer" height='35px'>
                <Footer />
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
        <Route
          path="/csvdata"
          element={
            <CSVData />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
