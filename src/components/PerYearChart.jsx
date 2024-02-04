import encountersByCountryData from '../data/FY07-23.json';
import ReactApexChart from 'react-apexcharts';

const PerYearChart = ({ country, startYear, endYear }) => {
    const countryName = country.name;
    const customValue = country.customValue;
    const uniqueYears = [];
    
    for (let i=startYear; i<=endYear; i++) {
        uniqueYears.push(i);
    }

    const sortedYearsObject = uniqueYears.reduce((acc, year) => {
        const numericYear = parseInt(year);
        acc[numericYear] = 0;
        return acc;
    }, {});

    encountersByCountryData.forEach((row) => {
        if (uniqueYears.includes(row["Fiscal Year"]) && country.name.toUpperCase() === row["Citizenship"].toUpperCase()) {
            sortedYearsObject[row["Fiscal Year"]] += row["Encounter Count"];
        }
    });

    const sortedEncountersArray = Object.keys(sortedYearsObject).map(key => sortedYearsObject[key]);

    const chartOptions = {
        colors: ['black'],
        chart: {
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: uniqueYears,
            labels: {
                style: {
                    colors: 'black',
                    fontSize: '12px'
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'black', 
                    fontSize: '14px'
                },
                formatter: function (value) {
                    return Math.round(value); 
                }
            },
        },
        markers: {
            size: 8,
        },
        stroke: {
            curve: 'smooth', // Set the curve style of the line
            width: 2, // Set the line width
        },
    };
    const chartSeries = [
        {
            name: 'Goal Differential',
            data: sortedEncountersArray
        },
    ];

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
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={200}
            />
        </div>
    );
};

export default PerYearChart;