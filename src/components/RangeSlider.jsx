import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}`;
}

export default function RangeSlider() {
    const MIN = 2007;
    const MAX = 2023;
    const [value, setValue] = React.useState([MIN, MAX]);

    const handleChange = (_, newValue) => {
        setValue(newValue);
        console.log(newValue[0], newValue[1]);
    };

    const marks = Array.from({ length: MAX - MIN + 1 }, (_, index) => {
        const yearValue = MIN + index;
        return {
        value: yearValue,
        label: `'${yearValue % 100 < 10 ? '0' : ''}${yearValue % 100}`, // Add leading zero if necessary
        };
    });

    return (
        <Box sx={{ width: "50vw" }}>
        <Slider
            id="yearSlider"
            getAriaLabel={() => 'Year range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            marks={marks}
            min={MIN}
            max={MAX}
        />
        </Box>
    );
}
