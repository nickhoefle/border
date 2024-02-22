import React, { useMemo, useState } from 'react';
import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HoverStrip from './HoverStrip';
import allCountriesGeoJsonData from '../world.geo.json';
import encountersSpreadsheet from '../data/FY07-23.json';

const MapComponent = ({ startYear = 2014, endYear = 2024, handleCloseOptionsPane, isMobile, handleSetZoom, zoomLevel, centerPoint, handleSetCenter, switchOn }) => {
    const [hoveredCountry, setHoveredCountry] = useState(null);

    const handleFeatureHover = (countryGeoJson) => {
        const countryName = countryGeoJson.properties.name.toUpperCase();
        setHoveredCountry({
            name: countryName,
            encounters: countryGeoJson.properties.encounters,
        });
        if (isMobile) {
            handleCloseOptionsPane();
        }
    };

    const handleFeatureLeave = () => {
        setHoveredCountry(null);
    };

    const countriesGeoJsonWithEncounters = useMemo(() => {
        const uniqueCountries = new Set();
        const countriesAndEncounters = {};

        encountersSpreadsheet.forEach((row) => {
            const citizenship = row.Citizenship;

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
            const countryName = country.properties.name.toUpperCase();

            if (uniqueCountries.has(countryName)) {
                country.properties.encounters = countriesAndEncounters[countryName] || 0;
            } else {
                country.properties.encounters = 0;
            }
        });

        return allCountriesGeoJsonData;
    }, [startYear, endYear]);

    // Custom hook to listen for the zoomend event
    const ZoomListener = () => {
        const map = useMapEvents({
            zoomend: () => {
                const currentZoom = map.getZoom();
                handleSetZoom(currentZoom);
            },
        });
    
        return null;
    };    

    const CenterListener = () => {
        const map = useMapEvents({
            moveend: () => {    
                const bounds = map.getBounds();
                const newCenter = [
                    (bounds._northEast.lat + bounds._southWest.lat) / 2, // Calculate new latitude
                    (bounds._northEast.lng + bounds._southWest.lng) / 2, // Calculate new longitude
                ];
                handleSetCenter(newCenter);
                console.log(newCenter)
            },
        });
    
        return null;
    };    

    return (
        <>
            <MapContainer center={centerPoint ? centerPoint : [25, 0]} zoom={ zoomLevel} style={{ height: 'calc(89vh - 30px)', width: '100vw', zIndex: 1 }}>
                <ZoomListener />
                <CenterListener />
                {switchOn && (
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                )}
                <GeoJSON
                    data={countriesGeoJsonWithEncounters}
                    style={(countryOnMap) => ({
                        fillColor: countryOnMap.properties.name.toUpperCase() === (hoveredCountry?.name || '').toUpperCase() ? 'black' : `rgba(0, 128, 0, ${countryOnMap.properties.encounters / 100})`,
                        weight: 1,
                        opacity: 1,
                        color: 'black',
                        dashArray: '0',
                        fillOpacity: 1,
                    })}
                    onEachFeature={(countryOnMap, layer) => {
                        layer.on({
                            mouseover: () => handleFeatureHover(countryOnMap),
                            mouseout: handleFeatureLeave,
                        });
                    }}
                />
            </MapContainer>
            {hoveredCountry && (
                <div id='hoverStripWrapper'>
                    <HoverStrip country={hoveredCountry} startYear={startYear} endYear={endYear} isMobile={isMobile} />
                </div>
            )}
        </>
    );
};

export default MapComponent;
