import React, { useEffect, useCallback, useMemo } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import encountersByCountryData from '../data/FY07-23.json';

const MapComponent = () => {
    const worldMapGeoJSONData = require('../world.geo.json');

    const { uniqueCountries, encounterencountersByCountry } = useMemo(() => {
        const set = new Set();
        const encountersByCountry = {};

        encountersByCountryData.forEach((row) => {
            const citizenship = row.Citizenship;
            if (!set.has(citizenship)) {
                set.add(citizenship);
                encountersByCountry[citizenship] = 0; 
            }
            encountersByCountry[citizenship] += row['Encounter Count'];
        });

        return { uniqueCountries: set, encounterencountersByCountry: encountersByCountry };
    }, []);

    worldMapGeoJSONData.features.forEach((feature) => {
        if (uniqueCountries.has(feature.properties.name.toUpperCase())) {
            feature.properties.customValue = encounterencountersByCountry[feature.properties.name.toUpperCase()];
        }
    });

    const handleMouseOver = useCallback((event) => {
        const layer = event.target;
        layer.setStyle({
            fillOpacity: 1,
        });

        layer.bindTooltip(`<strong>${layer.feature.properties.name}</strong><br />Custom Value: ${layer.feature.properties.customValue}`).openTooltip();
    }, []);

    const handleMouseOut = useCallback((event) => {
        const layer = event.target;
        layer.setStyle({
            fillOpacity: 0.7,
        });

        layer.closeTooltip();
    }, []);

    useEffect(() => {
        console.log([uniqueCountries]);
        console.log(encounterencountersByCountry);
    }, [uniqueCountries, encounterencountersByCountry, handleMouseOver, handleMouseOut]);

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: '500px', width: '100%' }}
        >
`1`
            <GeoJSON
                data={worldMapGeoJSONData}
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
                        mouseover: handleMouseOver,
                        mouseout: handleMouseOut,
                    });
                }}
            />
        </MapContainer>
    );
};

export default MapComponent;
