import encountersByCountryData from '../data/FY07-23.json';
import ReactApexChart from 'react-apexcharts';
import React from 'react';

const HoverStrip = React.memo(({ country, startYear, endYear, isMobile }) => {

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
        tooltip: {
            enabled: false,
        },
        xaxis: {
            categories: selectedYearRange,
            offsetY: 12,
            labels: {
                show: true,
                rotateAlways: isMobile ? true : false,
                style: {
                    colors: 'black',
                    fontSize: isMobile ? '12px' : '16px',
                    fontWeight: 'bold',
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                offsetX: -10,
                style: {
                    colors: 'black', 
                    fontSize: isMobile ? '12px' : '17px',
                    fontWeight: 'bold', 
                    textAlign: 'center', 
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
            offsetX: isMobile ? -4 : 3,
            style: {
                fontSize: isMobile ? '10px' : '16px',
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

    let chartWidth = '';
    const yearSpan = selectedYearRange.length;
    console.log(yearSpan);
    if (yearSpan < 6 || !isMobile) {
        chartWidth = '100%';
    } else {
        chartWidth = `${yearSpan * 16}%`;
    }

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
                height={'100%'}
                width={chartWidth}
            />
        </div>
    );
});

export default HoverStrip;