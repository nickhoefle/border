import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JSONData from './components/JSONData';
import Footer from './components/Footer';
import OptionsPane from './components/OptionsPane';
import CSVData from './components/CSVData';

function App() {
  const [isMobile, setIsMobile] = useState(null);
  const [visible, setVisible] = useState(!isMobile);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [centerPoint, setCenterPoint] = useState([25, 2]);
  const [switchOn, setSwitchOn] = useState(false);

  const handleCloseOptionsPane = () => {
    setVisible(false);
  }

  const setZoom = (currentZoom) => {
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
      setVisible(!isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]); // Add isMobile as a dependency to the useEffect dependency array

  const handleToggleOptionsVisibility = () => {
    setVisible((visible) => !visible);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="headerWrapper">
                <p id="titleText">U.S. BORDER PATROL NATIONWIDE APPREHENSIONS BY CITIZENSHIP</p>
                <button 
                  id={visible ? 'closeOptionsPaneButton' : 'openOptionsPaneButton'}
                  onClick={handleToggleOptionsVisibility}
                >
                  {visible ? 'Close' : 'Options'}
                </button>
                <OptionsPane 
                  id="optionsPane"
                  visible={visible} 
                  handleCloseOptionsPane={handleCloseOptionsPane} 
                  isMobile={isMobile} 
                  setZoom={setZoom} 
                  zoomLevel={zoomLevel} 
                  handleSetCenter={handleSetCenter} 
                  centerPoint={centerPoint}  
                  toggleSwitch={toggleSwitch}
                  switchOn={switchOn}
                />
              </div>
              <footer id="footerContainer" height='35px'>
                <Footer />
              </footer>
            </>
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
