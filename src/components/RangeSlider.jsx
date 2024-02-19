import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MapComponent from './MapComponent';
import { MapContainer } from 'react-leaflet';

const RangeSlider = ({ visible, handleCloseSlider, isMobile, setZoom, zoomLevel, setCenter, centerPoint }) => {
    const [value, setValue] = useState([2013, 2023]); //DEFAULT
    const MIN = 2007;
    const MAX = 2023;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div id="yearSliderWrapper">
            { visible &&
            <Box sx={{ width: '50vw', margin: '0 auto' }}>
                <Slider
                    id="yearSlider"
                    getAriaLabel={() => 'Year range'}
                    value={value}
                    onChange={handleChange}
                    marks={Array.from({ length: MAX - MIN + 1 }, (_, index) => ({
                        value: MIN + index,
                        label: `${(MIN + index) % 100 < 10 ? '0' : ''}${(MIN + index) % 100}`,
                    }))}
                    min={MIN}
                    max={MAX}
                />
            </Box>
            }
            <MapContainer>
                <MapComponent key={`${value[0]}-${value[1]}`} startYear={value[0]} endYear={value[1]} handleCloseSlider={handleCloseSlider} isMobile={isMobile} setZoom={setZoom} zoomLevel={zoomLevel} setCenter={setCenter} centerPoint={centerPoint} />
            </MapContainer>
        </div>
    );
};

export default RangeSlider;