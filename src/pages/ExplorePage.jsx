import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Map from '../components/Map'; // You need to replace this with your Map component
import 'animate.css';
import toast, { Toaster } from 'react-hot-toast';
import { RingLoader } from 'react-spinners';
import { useUser } from "@clerk/clerk-react"
import axios from 'axios';

const ExplorePage = () => {
    const { user } = useUser();
    const userID = user?.id

    const [allStoredMarkers, setAllStoredMarkers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllMarkers(userID)
    }, [userID])


    const getAllMarkers = () => {
        setLoading(true)
        // Get existing user markers
        // Initialize an empty array to store all markers
        let combinedMarkers = [];

        axios.get('http://localhost:8000/get-all-markers')
            .then(response => {
                const markers = response.data.global_markers
                markers.forEach(marker => {
                    // Parse the string as JSON to get the array of markers for the current user
                    const markersForUser = JSON.parse(marker);

                    // Concatenate the markers for the current user with the combinedMarkers array
                    combinedMarkers = combinedMarkers.concat(markersForUser);
                });

                setAllStoredMarkers(combinedMarkers)
                setLoading(false)
            })
            .catch(error => {
                // Handle error
                setLoading(false)
                console.error('Error retrieving markers:', error);
                toast.error("Error retrieving markers from database.");
            });
    }


    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl text-green-300 lg:text-5xl font-bold text-center mb-8 animate__animated animate__fadeInDown">
                        Explore Medicinal Plants Near You
                    </h1>

                    <div className="flex justify-center mb-8 animate__animated animate__fadeInUp">
                        {/* This is where you would render your map component */}
                        <Map globalStoredMarkers={allStoredMarkers} />
                    </div>

                    <p className="text-lg text-gray-600 text-center animate__animated animate__fadeInUp">
                        Discover the locations of various medicinal plants shared by our community members.
                        Click on the pins to learn more about each plant.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ExplorePage;
