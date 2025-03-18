import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-9xl mx-auto pb-10">
            <header className="flex items-center justify-between py-3 mb-4">
                
                <button 
                    onClick={() => navigate("/dashboard")} 
                    className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Back to Dashboard
                </button>
            </header>
        </div>
    );
};

export default Header;
