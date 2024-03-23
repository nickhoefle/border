import { useMemo } from "react";

const CalcEncountersPerCountry = ({ startYear, endYear, encountersSpreadsheet, allCountriesGeoJsonData }) => {
    return useMemo(() => {
        const uniqueCountries = new Set();
        const countriesAndEncounters = {};

        encountersSpreadsheet.forEach((row) => {
            let citizenship = row.Citizenship;

            if (!uniqueCountries.has(citizenship)) {
                uniqueCountries.add(citizenship);
            }

            if (
                parseInt(row["Fiscal Year"]) >= parseInt(startYear) &&
                parseInt(row["Fiscal Year"]) <= parseInt(endYear)
            ) {
                countriesAndEncounters[citizenship] = (countriesAndEncounters[citizenship] || 0) + row['Encounter Count'];
            }
        });

        allCountriesGeoJsonData.features.forEach((country) => {
            let countryName = country.properties.name.toUpperCase();

            if (uniqueCountries.has(countryName)) {
                country.properties.encounters = countriesAndEncounters[countryName] || 0;
            } else {
                country.properties.encounters = 0;
            }
        });
        
        return allCountriesGeoJsonData;
        
    }, [startYear, endYear, encountersSpreadsheet, allCountriesGeoJsonData]);
};

export default CalcEncountersPerCountry;
