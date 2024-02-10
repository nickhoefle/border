import React  from 'react';
import encountersByCountryData from '../data/FY07-23.json';

const JSONData = () => {
    
    const encountersByCountryDataString = JSON.stringify(encountersByCountryData)

    return (
        <p>{ encountersByCountryDataString }</p>
    );
};

export default JSONData;
