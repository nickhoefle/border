import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    // Load the GeoJSON data from the file
    const geoJSONData = require('../world.geo.json');

    // Add a custom property to each feature
    geoJSONData.features.forEach((feature) => {
        // You can replace 'customValue' with the actual property name you want to add
        feature.properties.customValue = Math.random() * 100; // Replace this with your actual data
    });

    const handleMouseOver = (event) => {
        const layer = event.target;
        layer.setStyle({
        fillOpacity: 1,
        });

        // Display the tooltip on hover
        layer.bindTooltip(`<strong>${layer.feature.properties.name}</strong><br />Custom Value: ${layer.feature.properties.customValue}`).openTooltip();
    };

    const handleMouseOut = (event) => {
        const layer = event.target;
        layer.setStyle({
        fillOpacity: 0.7,
        });

        // Close the tooltip on mouseout
        layer.closeTooltip();
    };

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
