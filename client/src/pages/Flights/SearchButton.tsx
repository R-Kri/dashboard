import { Search } from "lucide-react";
import React from "react";

interface SearchButtonProps {
    activeTab: "flights"
}

const SearchButton = () => {


    return (
        <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 -mt-12 text-white font-bold text-center py-2 rounded-full w-48 mx-auto cursor-pointer z-0 text-2xl flex items-center justify-center gap-2 transform translate-y-1/2"
        >
            <Search className="h-5 w-5" />
            <span>Search</span>
        </div>
    );
};

export default SearchButton;