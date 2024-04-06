import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
    const { user } = useUser();

    // Check if the user is signed in and has the role of admin
    const isAdmin = user && user.publicMetadata?.role === 'admin';

    return (
        <nav className="bg-green-300 p-4 flex justify-between items-center sticky top-0 z-10">
            {/* Display different logo for mobile view */}
            <div className="lg:hidden">
                <Link to="/">
                    <img src="icon.svg" alt="Mobile Logo" className="h-7 w-10" />
                </Link>
            </div>
            {/* Display regular logo for larger screens */}
            <div className="hidden lg:block">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="h-8" />
                </Link>
            </div>
            <div className="flex items-center">
                {/* Other navbar fields */}
                <Link to="/about" className="text-white hover:text-green-100 lg:text-lg text-sm lg:mr-10 mr-3">
                    About
                </Link>

                <SignedIn>

                    <Link to="/explore" className="text-white hover:text-green-100 lg:text-lg text-sm lg:mr-10 mr-3">
                        Explore
                    </Link>

                    <Link to="/contribute" className="text-white hover:text-green-100 lg:text-lg text-sm lg:mr-10 mr-3">
                        Contribute
                    </Link>

                    <div className="cursor-pointer text-white">
                        <UserButton afterSignOutUrl='/' />
                    </div>

                </SignedIn>

                <SignedOut>
                    <button className="text-white pr-4">
                        <Link to="/signIn">Login</Link>
                    </button>
                </SignedOut>
            </div>
        </nav>
    );
};

export default Navbar;