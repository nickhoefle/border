import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import encountersByCountryData from '../data/FY07-23.json';

const CSVData = () => {
    const [csvData, setCSVData] = useState('');

    useEffect(() => {
        const csvString = Papa.unparse(encountersByCountryData);
        setCSVData(csvString);
    }, []);

    return (
        <div>
            <p>{csvData}</p>
        </div>
    );
};

export default CSVData;
