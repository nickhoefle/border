import React, { useMemo, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import encountersByCountryData from '../data/FY07-23.json';
import worldMapGeoJSONData from '../world.geo.json';
import PerYearChart from './PerYearChart';
import zIndex from '@mui/material/styles/zIndex';

const MapComponent = ({ startYear = 2023, endYear = 2024 }) => {
    const [hoveredCountry, setHoveredCountry] = useState(null);

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
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '80vh', width: '100%', zIndex: 1 }}>
                <GeoJSON
                    data={featureData}
                    style={(feature) => ({
                        fillColor: feature.properties.name.toUpperCase() === (hoveredCountry?.name || '').toUpperCase() ? 'black' : `rgba(0, 128, 0, ${feature.properties.customValue / 100})`,
                        weight: 1,
                        opacity: 1,
                        color: 'black',
                        dashArray: '0',
                        fillOpacity: 1,
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
                        zIndex: 2
                    }}
                >
                    <PerYearChart country={hoveredCountry} startYear={startYear} endYear={endYear}/>
                </div>
            )}
        </div>
    );
};

export default MapComponent;