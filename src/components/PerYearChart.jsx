import encountersByCountryData from '../data/FY07-23.json';
import ReactApexChart from 'react-apexcharts';

const PerYearChart = ({ country, startYear, endYear }) => {
    const countryName = country.name;
    const customValue = country.customValue;
    const uniqueYears = [];
    
    console.log(country)

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
        <div id="hoverWrapper">
            <div id="nameAndCitizenshipWrapper">
                <img
                    src={`/flags/${countryName.replace(/\s/g, "")}.png`}
                    alt={`Flag of ${countryName}`}
                    style={{ height: '100px', width: 'auto', outline: '2px solid black' }}
                />
                <h1 id="countryName">{countryName}</h1>
                <h2 id="encountersText">{customValue.toLocaleString()}</h2>
                <strong id="nationwideEncountersText">NATIONWIDE ENCOUNTERS</strong>
            </div>
            <ReactApexChart
                id="lineGraph"
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={200}
            />
        </div>
    );
};

export default PerYearChart;