import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet CSS

const Map = ({ globalStoredMarkers }) => {

    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([7.8731, 80.7718], 7); // Centered on Sri Lanka and zoom level

        // Add the OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Define custom green marker icon
        const greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });


        // Add markers for dummy locations with custom green icon
        globalStoredMarkers.forEach(marker => {
            L.marker(marker.latLng, { icon: greenIcon }).addTo(map)
                .bindPopup(`<b>${marker.plantName}</b>`);
        });

        return () => {
            // Clean up
            map.remove();
        };
    }, [globalStoredMarkers]);

    return <div id="map" style={{ width: '80vw', height: '60vh', maxWidth: '1000px', maxHeight: '600px' }}
        className='shadow-xl shadow-green-200 rounded-2xl'
    />;
};

export default Map;
