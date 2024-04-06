import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react"
import 'animate.css';

const LandingPage = () => {
    const { user } = useUser();

    const username = user?.username
    const profileImg = user?.imageUrl

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex justify-center items-center bg-green-100 relative">
                {/* Background Image */}
                <img src="/src/assets/bg.jpg" alt="Background"
                    className="absolute inset-0 w-full h-full object-fit opacity-30" />

                <div className="lg:w-[35vw] w-[450px] text-center bg-green-200 p-8 rounded-lg 
                shadow-md animate__animated animate__fadeInUp relative z-10">
                    {user ? (
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl font-bold mb-4 text-green-500">
                                Welcome, {username}!
                            </h2>
                            <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-gray-700 mb-6">Ready to explore the world of medicinal plants?</p>

                            <Link to="/explore" className="bg-green-500 text-white py-2 px-6 rounded-full transition duration-300 hover:bg-green-600">
                                Start Exploring
                            </Link>

                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl font-bold mb-4 text-green-500">Welcome to AyurBotanica 🌿</h2>
                            <p className="text-gray-700 mb-6">Join our community and discover the wonders of medicinal plants!</p>
                            <a href="/signin" className="bg-green-500 text-white py-2 px-6 rounded-full 
                            transition duration-300 hover:bg-green-600">
                                Get Started
                            </a>
                        </div>
                    )}
                </div>

                {/* Visual Elements */}
                <div className="absolute top-0 left-0 w-[90%] h-[90%] flex flex-wrap 
                justify-center items-center pointer-events-none">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="w-10 h-10 bg-green-500 rounded-full 
                        opacity-20 mix-blend-multiply absolute"
                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                    ))}
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="w-10 h-10 bg-green-500 rounded-lg 
                        opacity-20 mix-blend-multiply absolute"
                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default LandingPage;