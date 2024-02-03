import encountersByCountryData from '../data/FY07-23.json';

const PerYearChart = ({ country, startYear, endYear }) => {
    const countryName = country.name;
    const customValue = country.customValue;
    const uniqueYears = [];
    
    console.log(country);
    console.log(startYear, endYear);

    encountersByCountryData.forEach((row) => {
        if (!uniqueYears.includes(row["Fiscal Year"])) {
            uniqueYears.push(row["Fiscal Year"]);
        }
    });

    uniqueYears.forEach((year, index, array) => {
        array[index] = parseInt(year);
    });

    const sortedYearsObject = uniqueYears.reduce((acc, year) => {
        const numericYear = parseInt(year);
        acc[numericYear] = 0;
        return acc;
    }, {});

    console.log(sortedYearsObject);
    console.log(`../flags/${countryName}.png`)

    return (
        <div>
            <img
                src={`/flags/${countryName}.png`}
                alt={`Flag of ${countryName}`}
                style={{ height: '50px', width: 'auto', outline: '2px solid black' }}
                />
            <h1> CITIZENSHIP - {countryName}</h1>
            {/* Your chart rendering code goes here based on sortedYearsObject */}
            <strong>ENCOUNTERS: {customValue.toLocaleString()}</strong>
        </div>
    );
};

export default PerYearChart;