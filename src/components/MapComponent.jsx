import React, { useMemo } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import encountersByCountryData from '../data/FY07-23.json';
import worldMapGeoJSONData from '../world.geo.json';

const MapComponent = ({ startYear = 2007, endYear = 2023 }) => {
    const featureData = useMemo(() => {
        const uniqueCountries = new Set();
        const encounterByCountry = {};

        encountersByCountryData.forEach((row) => {
            const citizenship = row.Citizenship;
            if (!uniqueCountries.has(citizenship)) {
                uniqueCountries.add(citizenship);
            }

            if (
                parseInt(row["Fiscal Year"]) >= parseInt(startYear) &&
                parseInt(row["Fiscal Year"]) <= parseInt(endYear)
            ) {
                encounterByCountry[citizenship] = (encounterByCountry[citizenship] || 0) + row['Encounter Count'];
            }
        });

        worldMapGeoJSONData.features.forEach((feature) => {
            const countryName = feature.properties.name.toUpperCase();
            if (uniqueCountries.has(countryName)) {
                feature.properties.customValue = encounterByCountry[countryName] || 0;
            } else {
                feature.properties.customValue = 0;
            }
        });

        return worldMapGeoJSONData;
    }, [startYear, endYear]);

    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
            <GeoJSON
                data={featureData}
                style={(feature) => ({
                    fillColor: `rgba(0, 128, 0, ${feature.properties.customValue / 100})`,
                    weight: 1,
                    opacity: 1,
                    color: 'black',
                    dashArray: '0',
                    fillOpacity: 0.7,
                })}
                onEachFeature={(feature, layer) => {
                    layer.bindTooltip(
                        `<strong>${feature.properties.name}</strong><br />Custom Value: ${feature.properties.customValue}`
                    );
                }}
            />
        </MapContainer>
    );
};

export default MapComponent;
