import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CSVData from './components/CSVData';
import Footer from './components/Footer';
import JSONData from './components/JSONData';
import OptionsPane from './components/OptionsPane';

function App() {
  const [isMobile, setIsMobile] = useState(null);
  const [optionsPaneVisible, setOptionsPaneVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [centerPoint, setCenterPoint] = useState([25, 2]);
  const [switchOn, setSwitchOn] = useState(false);

  const handleCloseOptionsPane = () => {
    setOptionsPaneVisible(false);
  }

  const handleSetZoom = (currentZoom) => {
    setZoomLevel(currentZoom);
  }

  const handleSetCenter = (currentCenter) => {
    setCenterPoint(currentCenter);
  }

  const toggleSwitch = (switchOn) => {
    setSwitchOn(switchOn);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Add isMobile as a dependency to the useEffect dependency array

  const handleToggleOptionsVisibility = () => {
    setOptionsPaneVisible((optionsPaneVisible) => !optionsPaneVisible);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div id="homepage">
                <div id="headerWrapper">
                  <p id="titleText">U.S. BORDER PATROL NATIONWIDE APPREHENSIONS BY CITIZENSHIP</p>
                  <div id="buttonWrapper">
                    <button 
                      id={optionsPaneVisible ? 'closeOptionsPaneButton' : 'openOptionsPaneButton'}
                      onClick={handleToggleOptionsVisibility}
                    >
                      {optionsPaneVisible ? 'Close' : 'Options'}
                    </button>
                  </div>
                </div>
                <OptionsPane 
                  id="optionsPane"
                  isMobile={isMobile} 
                  optionsPaneVisible={optionsPaneVisible} 
                  handleCloseOptionsPane={handleCloseOptionsPane} 
                  zoomLevel={zoomLevel} 
                  handleSetZoom={handleSetZoom} 
                  centerPoint={centerPoint} 
                  handleSetCenter={handleSetCenter}  
                  switchOn={switchOn}
                  toggleSwitch={toggleSwitch}
                />
                <Footer />
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