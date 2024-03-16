import React, { useMemo, useState } from 'react';
import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HoverStrip from './HoverStrip';
import allCountriesGeoJsonData from '../data/world.geo.json';
import encountersSpreadsheet from '../data/FY07-23.json';
import MapLegend from './MapLegend';

const MapComponent = ({ startYear, endYear, optionsPaneVisible, handleCloseOptionsPane, isMobile, handleSetZoom, zoomLevel, centerPoint, handleSetCenter, switchOn }) => {
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
        console.log(uniqueCountries);
        return allCountriesGeoJsonData;
    }, [startYear, endYear]);
    

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
            },
        });   
        return null;
    };
    
    const calculateFillColor = (country, hoveredCountry) => {
        const countryName = country.properties.name.toUpperCase();
        const encounters = country.properties.encounters;
        const isHovered = countryName === (hoveredCountry?.name || '').toUpperCase();

        switch (true) {
            case isHovered:
                return 'black';
            case encounters >= 1000000:
                return '#1D2C17';
            case encounters >= 100000:
                return '#3E5631';
            case encounters >= 10000:
                return '#5F804B';
            case encounters >= 1000:
                return '#81AB64';
            case encounters >= 100:
                return '#A2D57E';
            case encounters >= 1:
                return '#C3FF98';
            default:
                return 'white';
        }
    };

    return (
        <>
            <div 
                style={{ 
                    height: isMobile ? 'calc(100vh - 60px)' : '100vh', 
                    zIndex: 2, position: 'relative', 
                    opacity: optionsPaneVisible ? '40%' : '100%' 
                }}
            >
                <MapContainer 
                    center={centerPoint ? centerPoint : [25, 0]} 
                    zoom={zoomLevel} 
                    style={{ 
                        height: '100vh', 
                        width: '100vw', 
                        zIndex: 1, 
                        position: 'absolute', 
                        fillOpacity: 0.4 
                    }}
                >
                    <ZoomListener />
                    <CenterListener />
                    { switchOn && (
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    )}
                    <GeoJSON
                        data={countriesGeoJsonWithEncounters}
                        style={(countryOnMap) => ({
                            fillColor: calculateFillColor(countryOnMap, hoveredCountry),
                            weight: 1,
                            color: 'black',
                            dashArray: '0',
                        })}
                        onEachFeature={(countryOnMap, layer) => {
                            layer.on({
                                mouseover: () => handleFeatureHover(countryOnMap),
                                mouseout: handleFeatureLeave,
                            });
                        }}
                    />
                </MapContainer>
                <MapLegend 
                    countriesGeoJsonWithEncounters={countriesGeoJsonWithEncounters} 
                    switchOn={switchOn}
                />
            </div>
            {hoveredCountry && (
                <HoverStrip 
                    country={hoveredCountry} 
                    startYear={startYear} 
                    endYear={endYear} 
                    isMobile={isMobile} 
                />
            )}
        </>
    );
};

export default MapComponent;