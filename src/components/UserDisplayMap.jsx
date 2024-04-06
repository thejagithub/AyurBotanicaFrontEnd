import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet CSS
import { useUser } from "@clerk/clerk-react"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { RingLoader } from 'react-spinners';

const UserDisplayMap = ({ onMarkerAdded, storedMarkers, default_plantName }) => {
    const { user } = useUser();
    const userID = user?.id

    const [markers, setMarkers] = useState(storedMarkers);
    const [plantName, setPlantName] = useState(default_plantName);
    const [mapInstance, setMapInstance] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([7.8731, 80.7718], 7); // Centered on Sri Lanka and zoom level
        setMapInstance(map);

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

        // Add existing markers from state
        markers.forEach(marker => {
            const newMarker = L.marker(marker.latLng, { icon: greenIcon }).addTo(map)
                .bindPopup(`<b>${marker.plantName}</b>`);
            newMarker.on('dblclick', () => handleMarkerDelete(marker)); // Delete marker on double click
        });

        // Event listener for adding marker on map click
        map.on('click', handleMapClick);

        return () => {
            // Clean up
            map.remove();
        };
    }, [markers, plantName]);


    const handleMapClick = (e) => {
        const newMarker = {
            latLng: e.latlng,
            plantName: plantName || '' // Default to 'Plant' if no name provided
        };
        setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        onMarkerAdded({ latLng: e.latlng, plantName: plantName });

        // Add marker to the map
        const greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        const marker = L.marker(newMarker.latLng, { icon: greenIcon }).addTo(mapInstance)
            .bindPopup(`<b>${newMarker.plantName}</b>`);
        marker.on('dblclick', () => handleMarkerDelete(newMarker)); // Delete marker on double click
    };

    const handlePlantNameChange = (e) => {
        setPlantName(e.target.value);
    };

    const handleMarkerDelete = (marker) => {
        // Delete marker on double click
        const index = markers.findIndex(m => m === marker);
        if (index !== -1) {
            setLoading(true)
            const updatedMarkers = [...markers];
            updatedMarkers.splice(index, 1);
            setMarkers(updatedMarkers);

            const db_formData = new FormData();
            db_formData.append('user_id', userID);
            db_formData.append('markers', JSON.stringify(updatedMarkers));

            // Save or markers as needed
            axios.post('http://localhost:8000/save-markers', db_formData)
                .then(response => {
                    setLoading(false);
                    const resp = response.data;
                    console.log(resp);
                    toast.success("Marker deleted successfully!");
                })
                .catch(error => {
                    setLoading(false);
                    console.error('Error deleting markers in db:', error);
                    toast.error("Error deleting markers. Please try again later.");
                });

        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <input
                type="text"
                placeholder="Enter Plant Name"
                value={plantName}
                onChange={handlePlantNameChange}
                className='mb-8 w-[300px] text-sm p-2 rounded-2xl border border-green-300 focus:outline-none focus:border-green-500'
            />
            <div id="map" style={{ width: '80vw', height: '60vh', maxWidth: '1000px', maxHeight: '600px' }}
                className='mb-8 shadow-xl shadow-green-200 rounded-2xl'
            />

            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-70 flex justify-center items-center z-50">
                    <RingLoader color="#3FDF57" loading={loading} size={150} />
                </div>
            )}
        </div>
    );
};

export default UserDisplayMap;
