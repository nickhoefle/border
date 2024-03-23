import encountersByCountryData from '../data/FY07-23.json';

const CalcCountryEncountersPerYear = ({ startYear, endYear, country }) => {
    
    let selectedYearRange = [];
    let countryName = country.name;
    
    for (let i=startYear; i<=endYear; i++) {
        selectedYearRange.push(i);
    }

    const sortedYearsObject = selectedYearRange.reduce((encounters, year) => {
        const numericYear = parseInt(year);
        encounters[numericYear] = 0;
        return encounters;
    }, {});

    encountersByCountryData.forEach((row) => {
        if (
            selectedYearRange.includes(row["Fiscal Year"]) && 
            countryName.toUpperCase() === row["Citizenship"].toUpperCase()
        ) {
            sortedYearsObject[row["Fiscal Year"]] += row["Encounter Count"];
        }
    });

    const sortedEncountersArray = Object.keys(sortedYearsObject).map(key => sortedYearsObject[key]);
    
    return {
        selectedYearRange: selectedYearRange,
        sortedEncountersArray: sortedEncountersArray
    };
};

export default CalcCountryEncountersPerYear;