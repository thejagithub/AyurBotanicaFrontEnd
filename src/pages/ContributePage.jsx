import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Expander from '../components/Expander';
import ImageUploader from '../components/ImageUploader';
import UserDisplayMap from '../components/UserDisplayMap';

import toast, { Toaster } from 'react-hot-toast';
import { RingLoader } from 'react-spinners';
import { useUser } from "@clerk/clerk-react"
import axios from 'axios';
import 'animate.css';


const ContributePage = () => {
    const { user } = useUser();
    const userID = user?.id

    const [files, setFiles] = useState({});
    const [classification, setClassification] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [storedMarkers, setStoredMarkers] = useState([]);
    const [loading, setLoading] = useState(false);


    const dummyPlantData = {
        "Ahu Plant": {
            "Name": "Ahu Plant",
            "Scientific Name": "Datura stramonium",
            "Family": "Solanaceae",
            "Common Names": ["Jimsonweed", "Thornapple", "Devil's snare"],
            "Native To": "Americas",
            "Description": "Datura stramonium is a highly poisonous plant species of the nightshade family. It is an annual herb with large, erect, and branching stems. The leaves are broad, with irregularly toothed margins. The flowers are trumpet-shaped, white to purple in color.",
            "Uses": [
                "Used in traditional medicine for its hallucinogenic properties",
                "Has historical and cultural significance in various indigenous communities"
            ],
            "Propagation": "Datura stramonium can be propagated by seeds."
        },
        "Iriweriya Plant": {
            "Name": "Iriweriya plant",
            "Scientific Name": "Cardiospermum halicacabum",
            "Family": "Sapindaceae",
            "Common Names": ["Balloon vine", "Heart pea", "Love in a puff"],
            "Native To": "Tropical regions of Africa, Asia, and the Americas",
            "Description": "Cardiospermum halicacabum is a climbing plant with tendrils that belong to the soapberry family. It has palmately compound leaves and produces small white flowers followed by inflated, papery capsules containing black seeds with a white heart-shaped spot.",
            "Uses": [
                "Used in traditional medicine for various ailments",
                "Ornamental plant for gardens"
            ],
            "Propagation": "Cardiospermum halicacabum can be propagated by seeds or stem cuttings."
        },
        "Maduruthala Plant": {
            "Name": "Maduruthala Plant",
            "Scientific Name": "Solenostemma argel",
            "Family": "Asclepiadaceae",
            "Common Names": ["Argel", "Salat", "Horgoza"],
            "Native To": "North Africa and the Middle East",
            "Description": "Solenostemma argel is a perennial herbaceous plant with hairy stems and opposite, ovate leaves. It produces small white or pink flowers in clusters. The plant has been used in traditional medicine for various purposes.",
            "Uses": [
                "Used in traditional medicine for gastrointestinal issues, respiratory problems, and as a diuretic",
                "Cultivated as an ornamental plant"
            ],
            "Propagation": "Solenostemma argel can be propagated by seeds or stem cuttings."
        },
        "Ranawara Plant": {
            "Name": "Ranawara plant",
            "Scientific Name": "Cassia auriculata",
            "Family": "Fabaceae",
            "Common Names": ["Tanner's Cassia", "Avaram Senna", "Senna auriculata"],
            "Native To": "India and Sri Lanka",
            "Description": "Cassia auriculata is a shrub with yellow flowers and pinnate leaves. It is cultivated for its ornamental value as well as for its medicinal properties. The plant has various traditional uses and is considered sacred in some cultures.",
            "Uses": [
                "Used in traditional medicine for diabetes, skin diseases, and as a laxative",
                "Used as a natural dye for textiles"
            ],
            "Propagation": "Cassia auriculata can be propagated by seeds or stem cuttings."
        }
    };

    useEffect(() => {
        getUserMarkers(userID)
    }, [userID])

    // Function to update additionalInfo based on the classification
    const updateAdditionalInfo = (classification) => {
        const plantInfo = dummyPlantData[classification];
        if (plantInfo) {
            setAdditionalInfo(plantInfo);
        } else {
            console.log(`No additional info found for ${classification}`);
        }
    };

    const getUserMarkers = (userId) => {
        // Get existing user markers
        const user_marker_db_formdata = new FormData();
        user_marker_db_formdata.append('user_id', userId);
        axios.post('http://localhost:8000/get-user-markers', user_marker_db_formdata)
            .then(response => {
                const updatedMarkers = [...storedMarkers, ...response.data.user_markers];
                setStoredMarkers(updatedMarkers)
                setLoading(false)
                console.log("updated markers", updatedMarkers)
            })
            .catch(error => {
                // Handle error
                setLoading(false)
                console.error('Error retrieving markers:', error);
                toast.error("Error retrieving markers from database.");
            });
    }

    const handleClassification = () => {
        setLoading(true);
        // Call backend API to classify the plant
        const formData = new FormData();
        formData.append('image', files.image[0]);

        axios.post('http://127.0.0.1:8000/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                // Handle successful response
                setLoading(false)
                console.log('Prediction result:', response.data);
                setClassification(response.data)
                updateAdditionalInfo(response.data)
                toast.success("Plant classified successfully")
            })
            .catch(error => {
                // Handle error
                setLoading(false)
                console.error('Error classifying image:', error);
                toast.error("Error classifying plant...")
            });
    };

    // Append the new marker coordinates
    const appendMarkers = (coordinates) => {
        const updatedMarkers = [...storedMarkers, coordinates];
        setStoredMarkers(updatedMarkers);
        setLoading(true);

        const db_formData = new FormData();
        db_formData.append('user_id', userID);
        db_formData.append('markers', JSON.stringify(updatedMarkers));

        // Save or markers as needed
        axios.post('http://localhost:8000/save-markers', db_formData)
            .then(response => {
                setLoading(false);
                const resp = response.data;
                console.log(resp);
                toast.success("Markers saved successfully!");
            })
            .catch(error => {
                setLoading(false);
                console.error('Error saving markers in db:', error);
                toast.error("Error saving markers. Please try again later.");
            });
    };

    const handleMarkerAdded = (coordinates) => {
        // Handle the marker coordinates
        appendMarkers(coordinates)
    };


    return (
        <>
            <Navbar />
            <Toaster />

            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl text-green-300 lg:text-5xl font-bold text-center mb-8 animate__animated animate__fadeInDown">
                        Add Your Medicinal Plant
                    </h1>

                    <div className="mb-8 flex flex-col lg:mt-20 mt-10 animate__animated animate__fadeInUp">
                        <ImageUploader
                            accept={{ "image/*": ['.png', '.jpg', '.jpeg'] }}
                            files={files.image}
                            setFiles={(acceptedFiles) => setFiles({ ...files, "image": acceptedFiles })}
                            className={"mt-1 flex justify-center items-center px-6 py-3 border border-gray-300 border-dashed rounded-md cursor-pointer"}
                        />

                        {!(Object.keys(files).length === 0) && files && (
                            <>
                                <div className="max-w-md mx-auto mb-8 mt-8 animate__animated animate__fadeInUp">
                                    <img src={URL.createObjectURL(files?.image[0])} alt="Uploaded"
                                        className="w-full rounded-2xl shadow-xl shadow-green-300" />
                                </div>

                                <div className="max-w-md mx-auto mt-8 animate__animated animate__fadeInUp">
                                    <button onClick={handleClassification}
                                        className="bg-green-500 text-white py-2 px-6 rounded-full transition duration-300
                                     hover:bg-green-600">
                                        Classify Plant Type
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>

                {classification && (
                    <>
                        <div className="flex flex-col w-full">
                            <div className="max-w-[60%] mx-auto mb-8 animate__animated animate__fadeInUp">
                                <Expander title="Show medicinal information">
                                    {Object.entries(additionalInfo).map(([fieldName, fieldValue]) => (
                                        <>
                                            <div className="mb-4 w-full h-auto bg-green-100 border
                                         border-gray-300 rounded-md py-2 px-4" key={fieldName}>
                                                <h2 className="lg:text-lg text-md font-bold mb-2">{fieldName}</h2>
                                                <h3 className="lg:text-md text-sm text-gray-500 font-thin mb-2">{fieldValue}</h3>
                                            </div>
                                        </>
                                    ))}
                                </Expander>
                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <div className="flex flex-col p-5 items-center justify-center">
                                    <UserDisplayMap onMarkerAdded={handleMarkerAdded}
                                        storedMarkers={storedMarkers}
                                        default_plantName={classification} />
                                </div>

                            </div>
                        </div>
                    </>
                )}

                {loading && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-70 flex justify-center items-center z-50">
                        <RingLoader color="#3FDF57" loading={loading} size={150} />
                    </div>
                )}


            </div>
        </>
    );
};

export default ContributePage;
