import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MapComponent from './MapComponent';

const RangeSlider = () => {
    const [value, setValue] = useState([2023, 2024]); //DEFAULT
    const MIN = 2007;
    const MAX = 2024;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div id="yearSliderWrapper">
            <Box sx={{ width: '50vw', margin: '0 auto' }}>
                <Slider
                    id="yearSlider"
                    getAriaLabel={() => 'Year range'}
                    value={value}
                    onChange={handleChange}
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