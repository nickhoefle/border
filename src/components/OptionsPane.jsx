import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MapComponent from './MapComponent';
import OsmSwitch from './OsmSwitch';

const OptionsPane = ({ isMobile, optionsPaneVisible, handleCloseOptionsPane, zoomLevel, handleSetZoom, centerPoint, handleSetCenter, switchOn, toggleSwitch }) => {
    const [value, setValue] = useState([2013, 2023]); //DEFAULT
    const MIN = 2007;
    const MAX = 2023;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            { optionsPaneVisible &&
                <div id="optionsPaneWrapper">
                    <Box sx={{ width: '50vw', margin: '0 auto' }}>
                        <label id="yearLabel">Year</label>
                        <Slider
                            id="yearSlider"
                            value={value}
                            onChange={handleChange}
                            marks={Array.from({ length: MAX - MIN + 1 }, (_, index) => ({
                                value: MIN + index,
                                label: `${(MIN + index) % 100 < 10 ? '0' : ''}${(MIN + index) % 100}`,
                            }))}
                            min={MIN}
                            max={MAX}
                        />
                        <OsmSwitch toggleSwitch={toggleSwitch} switchOn={switchOn} />
                    </Box>
                </div>
            }
            <MapComponent 
                key={`${value[0]}-${value[1]}`} 
                startYear={value[0]} 
                endYear={value[1]} 
                isMobile={isMobile} 
                optionsPaneVisible={optionsPaneVisible}
                handleCloseOptionsPane={handleCloseOptionsPane} 
                zoomLevel={zoomLevel} 
                handleSetZoom={handleSetZoom} 
                centerPoint={centerPoint} 
                handleSetCenter={handleSetCenter} 
                switchOn={switchOn}
            />
        </>
    );
};

export default OptionsPane;