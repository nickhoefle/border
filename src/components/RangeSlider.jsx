// RangeSlider component
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MapComponent from './MapComponent';

function valuetext(value) {
    return `${value}`;
}

const RangeSlider = () => {
    const MIN = 2007;
    const MAX = 2024;
    const [value, setValue] = useState([2023, 2024]); //DEFAULT

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ position: 'fixed', top: 0, width: '100%', textAlign: 'center', zIndex: 1 }}>
            <Box sx={{ width: '50vw', margin: '0 auto' }}>
                <Slider
                    id="yearSlider"
                    getAriaLabel={() => 'Year range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    marks={Array.from({ length: MAX - MIN + 1 }, (_, index) => ({
                        value: MIN + index,
                        label: `'${(MIN + index) % 100 < 10 ? '0' : ''}${(MIN + index) % 100}`,
                    }))}
                    min={MIN}
                    max={MAX}
                />
            </Box>
            <MapComponent key={`${value[0]}-${value[1]}`} startYear={value[0]} endYear={value[1]} />
        </div>
    );
};

export default RangeSlider;
