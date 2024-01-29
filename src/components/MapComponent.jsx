import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import React, { useEffect, useCallback, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import jsonData from '../data/FY21-23.json';

const MapComponent = () => {
    const geoJSONData = require('../world.geo.json');

    geoJSONData.features.forEach((feature) => {
        feature.properties.customValue = Math.random() * 100; // Replace this with actual data
    });

    const { countriesSet, encounterCountByCountry } = useMemo(() => {
        const set = new Set();
        const countByCountry = {};

        jsonData.forEach((row) => {
            const citizenship = row.Citizenship;

            if (!set.has(citizenship)) {
                set.add(citizenship);
                countByCountry[citizenship] = 0; 
            }

            countByCountry[citizenship] += row['Encounter Count'];
        });

        return { countriesSet: set, encounterCountByCountry: countByCountry };
    }, []);

    const handleMouseOver = useCallback((event) => {
        const layer = event.target;
        layer.setStyle({
            fillOpacity: 1,
        });

        // Display the tooltip on hover
        layer.bindTooltip(`<strong>${layer.feature.properties.name}</strong><br />Custom Value: ${layer.feature.properties.customValue}`).openTooltip();
    }, []);

    const handleMouseOut = useCallback((event) => {
        const layer = event.target;
        layer.setStyle({
            fillOpacity: 0.7,
        });

        // Close the tooltip on mouseout
        layer.closeTooltip();
    }, []);

    useEffect(() => {
        // Log the Set of unique countries
        console.log([countriesSet]);

        // Log the object with "Encounter Count" for each country
        console.log(encounterCountByCountry);
    }, [countriesSet, encounterCountByCountry, handleMouseOver, handleMouseOut]);

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
                data={geoJSONData}
                style={(feature) => ({
                    fillColor: `rgba(0, 128, 0, ${feature.properties.customValue / 100})`,
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7,
                })}
                onEachFeature={(feature, layer) => {
                    layer.on({
                        mouseover: handleMouseOver,
                        mouseout: handleMouseOut,
                    });
                }}
            />
        </MapContainer>
    );
};

export default MapComponent;
