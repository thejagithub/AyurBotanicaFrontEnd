import React, { useState } from "react";

function Expander({ title, children }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="mb-4 flex flex-col">
            <button onClick={toggleExpanded} className="bg-green-500 text-white py-2 px-6 
                                    rounded-full transition duration-300 hover:bg-green-600">
                {expanded ? "▼" : "▶"} {title}
            </button>
            {expanded && (
                <div className="mt-8 shadow-lg text-center
                 shadow-green-200 border-green-300 p-4">
                    {children}
                </div>
            )}
        </div>
    );
}

export default Expander;