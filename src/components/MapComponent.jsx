import React, { useMemo, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import encountersByCountryData from '../data/FY07-23.json';
import worldMapGeoJSONData from '../world.geo.json';
import PerYearChart from './PerYearChart';

const MapComponent = ({ startYear = 2023, endYear = 2024 }) => {
    const [hoveredCountry, setHoveredCountry] = useState(null);

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
            const nameEn = feature.properties.name_en; // Extracting name_en property
        
            if (uniqueCountries.has(countryName)) {
                feature.properties.customValue = encounterByCountry[countryName] || 0;
            } else {
                feature.properties.customValue = 0;
            }
        
            // Now you can use the 'nameEn' variable as needed in your loop
            console.log(nameEn);
        });

        return worldMapGeoJSONData;
    }, [startYear, endYear]);

    const handleFeatureHover = (feature) => {
        const countryName = feature.properties.name.toUpperCase();
        setHoveredCountry({
            name: countryName,
            customValue: feature.properties.customValue,
        });
    };

    const handleFeatureLeave = () => {
        setHoveredCountry(null);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '80vh', width: '100%' }}>
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
                        layer.on({
                            mouseover: () => handleFeatureHover(feature),
                            mouseout: handleFeatureLeave,
                        });
                    }}
                />
            </MapContainer>
            {hoveredCountry && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: '#fff',
                        padding: '10px',
                        borderTop: '1px solid #ccc',
                    }}
                >
                    <PerYearChart country={hoveredCountry} startYear={startYear} endYear={endYear}/>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
