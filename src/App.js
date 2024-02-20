import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JSONData from './components/JSONData';
import Footer from './components/Footer';
import RangeSlider from './components/RangeSlider';
import CSVData from './components/CSVData';

function App() {
  const [isMobile, setIsMobile] = useState(null);
  const [visible, setVisible] = useState(!isMobile);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [centerPoint, setCenterPoint] = useState([25, 2]);

  const setZoom = (currentZoom) => {
    setZoomLevel(currentZoom);
  }

  const setCenter = (currentCenter) => {
    setCenterPoint(currentCenter);
  }

  const toggleRangeSliderVisibility = () => {
    setVisible((visible) => !visible);
  };

  const handleCloseSlider = () => {
    setVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
      setVisible(!isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]); // Add isMobile as a dependency to the useEffect dependency array

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div id="app">
              <div style={{ height: '9.5vh' }}>
                <p id="titleText">U.S. BORDER PATROL NATIONWIDE APPREHENSIONS BY CITIZENSHIP</p>
                <button id="toggleYearButton" onClick={visible ? handleCloseSlider : toggleRangeSliderVisibility}>
                  {visible ? 'Close' : 'Toggle Year Range'}
                </button>
                <RangeSlider visible={visible} id="rangeSlider" handleCloseSlider={handleCloseSlider} isMobile={isMobile} setZoom={setZoom} zoomLevel={zoomLevel} setCenter={setCenter} centerPoint={centerPoint} />
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
