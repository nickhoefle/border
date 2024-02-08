import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MapComponent from './MapComponent';

const RangeSlider = () => {
    const [value, setValue] = useState([2013, 2023]); //DEFAULT
    const MIN = 2007;
    const MAX = 2023;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const mapComponentElement = React.createElement(MapComponent, {
        key: `${value[0]}-${value[1]}`,
        startYear: value[0],
        endYear: value[1],
    });

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
        </div>
    );
};

export default RangeSlider;