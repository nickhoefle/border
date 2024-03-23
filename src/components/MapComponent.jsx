import { React, useState } from 'react';
import { MapContainer, GeoJSON, useMapEvents, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HoverStrip from './HoverStrip';
import CalcEncountersPerCountry from '../helpers/AddTotalEncountersToGeoJson';
import allCountriesGeoJsonData from '../data/world.geo.json';
import encountersSpreadsheet from '../data/FY07-23.json';
import MapLegend from './MapLegend';

const MapComponent = ({ startYear, endYear, optionsPaneVisible, handleCloseOptionsPane, isMobile, handleSetZoom, zoomLevel, centerPoint, handleSetCenter, switchOn }) => {
    
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const countriesGeoJsonWithEncounters = CalcEncountersPerCountry({ startYear, endYear, encountersSpreadsheet, allCountriesGeoJsonData });
    
    const handleFeatureHover = (countryGeoJson) => {
        let country = countryGeoJson.properties;
        setHoveredCountry({
            name: country.name.toUpperCase(),
            encounters: country.encounters,
        });
        if (isMobile) {
            handleCloseOptionsPane();
        }
    };

    const handleFeatureLeave = () => {
        setHoveredCountry(null);
    };

    
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

        if (!switchOn) {
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
        } else {
            switch (true) {
                case isHovered:
                    return 'black';
                default:
                    return 'white';
            }
        }
    };

    return (
        <>
            <div 
                style={{ 
                    position: 'relative',  
                    height: isMobile ? 'calc(100vh - 60px)' : '100vh', 
                    opacity: optionsPaneVisible ? '40%' : '100%' 
                }}
            >
                <MapContainer 
                    style={{ 
                        height: '100vh', 
                        width: '100vw', 
                        position: 'absolute', 
                        fillOpacity: 0.6 
                    }}
                    center={centerPoint ? centerPoint : [25, 0]} 
                    zoom={zoomLevel} 
                >
                    { switchOn && (
                        <TileLayer
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/{style}/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://carto.com/">Carto</a>'
                            // eslint-disable-next-line
                            style='light_all'
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
                    <ZoomListener />
                    <CenterListener />
                </MapContainer>
                { !switchOn &&
                    <MapLegend 
                        countriesGeoJsonWithEncounters={countriesGeoJsonWithEncounters} 
                        switchOn={switchOn}
                    />
                }
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