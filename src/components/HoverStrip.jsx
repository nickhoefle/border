import encountersByCountryData from '../data/FY07-23.json';
import ReactApexChart from 'react-apexcharts';

const HoverStrip = ({ country, startYear, endYear }) => {
    const countryName = country.name;
    const encounters = country.encounters;
    const selectedYearRange = [];

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
            country.name.toUpperCase() === row["Citizenship"].toUpperCase()
        ) {
            sortedYearsObject[row["Fiscal Year"]] += row["Encounter Count"];
        }
    });

    const sortedEncountersArray = Object.keys(sortedYearsObject).map(key => sortedYearsObject[key]);

    const chartOptions = {
        colors:['black', 'black', 'black', 'black', 'black', 'black'],
        chart: {
            fontFamily: `Segoe UI`,
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: selectedYearRange,
            offsetY: 12,
            labels: {
                style: {
                    colors: 'black',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
        },
        yaxis: {
            labels: {
                offsetX: -12,
                style: {
                    colors: 'black', 
                    fontSize: '14px',
                    fontWeight: 'bold', 
                    textAlign: 'center' 
                },
                formatter: function (value) {
                    if (value === 0) {
                        return;
                    }
                    return Math.round(value).toLocaleString(); 
                }
            },
            axisBorder: {
                show: false,
            },
            tickAmount: 4,
        },
        markers: {
            size: 3,
        },
        dataLabels: {
            enabled: true,
            offsetY: -5,
            offsetX: 0,
            style: {
                fontWeight: 1,
            },
            background: { enabled: false },
            formatter: function (val, opts) {
                return val.toLocaleString()
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
    };
    const chartSeries = [
        {
            name: 'Encounters Per Year Per Country',
            data: sortedEncountersArray
        },
    ];

    return (
        <div id="hoverWrapper">
            <div id="nameAndCitizenshipWrapper">
                <img
                    src={`/flags/${countryName.replace(/\s/g, "")}.png`}
                    alt={`Flag of ${countryName}`}
                    id="flagImage"
                />
                <h1 id="countryName">{countryName}</h1>
                <h2 id="encountersText">{encounters.toLocaleString()}</h2>
                <strong id="nationwideEncountersText">NATIONWIDE ENCOUNTERS PER U.S. CBP DATA</strong>
            </div>
            <ReactApexChart
                id="lineGraph"
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={220}
            />
        </div>
    );
};

export default HoverStrip;