import React from 'react';
import Navbar from '../components/Navbar';

const AboutPage = () => {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl text-green-300 lg:text-5xl font-bold text-center mb-8
                        animate__animated animate__fadeInDown">
                        Discover Medicinal Plants Around You
                    </h1>
                    <div className="flex flex-col items-center md:flex-row md:justify-between ">
                        <div className="max-w-md mb-8 md:mr-8 text-gray-600 animate__animated animate__fadeInLeft">
                            <p className="lg:text-lg text-sm leading-relaxed">
                                Welcome to our community-driven platform where you can explore and share knowledge about medicinal plants.
                            </p>
                            <p className="lg:text-lg text-sm leading-relaxed mt-4">
                                Simply upload a picture of a plant, and our advanced AI model will identify it for you. Learn about its properties, uses, and where to find it.
                            </p>
                            <p className="lg:text-lg text-sm leading-relaxed mt-4">
                                Join our mission to map the locations of these valuable plants. Contribute your findings and explore others' discoveries on our interactive map.
                            </p>
                        </div>
                        <img
                            src="/src/assets/logo.png"
                            alt="Discover Medicinal Plants"
                            className="lg:w-96 w-80 rounded-lg shadow-md animate__animated animate__fadeInRight"
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default AboutPage;