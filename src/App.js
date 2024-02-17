import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JSONData from './components/JSONData';
import Footer from './components/Footer';
import RangeSlider from './components/RangeSlider';
import CSVData from './components/CSVData';

function App() {
  const [isMobile, setIsMobile] = useState(null);
  const [visible, setVisible] = useState(!isMobile);

  const toggleRangeSliderVisibility = () => {
    setVisible((visible) => !visible);
  };

  const handleCloseSlider = () => {
    setVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
      setVisible(!isMobile); // Toggle visibility based on the updated isMobile value
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
                <RangeSlider visible={visible} id="rangeSlider" handleCloseSlider={handleCloseSlider} isMobile={isMobile}/>
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
