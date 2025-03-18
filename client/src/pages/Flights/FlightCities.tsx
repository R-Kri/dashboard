import React, { useState } from "react";
import { Plane } from "lucide-react";
import { cities } from "../../data/cities";

interface City {
    code: string;
    name: string;
    airport: string;
}

const DEFAULT_FROM_CITY: City = cities.find(city => city.code === "DEL") || cities[0];
const DEFAULT_TO_CITY: City = cities.find(city => city.code === "BLR") || cities[1] || cities[0];

const FlightCities: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState<{ from: boolean; to: boolean }>({
        from: false,
        to: false,
    });

    const [fromCity, setFromCity] = useState<City>(DEFAULT_FROM_CITY);
    const [toCity, setToCity] = useState<City>(DEFAULT_TO_CITY);

    const handleCitySelect = (city: City, type: "from" | "to") => {
        if (type === "from") {
            if (city.code === toCity.code) setToCity(fromCity);
            setFromCity(city);
        } else {
            if (city.code === fromCity.code) setFromCity(toCity);
            setToCity(city);
        }
        setShowDropdown({ from: false, to: false });
    };

    const renderCityDropdown = (type: "from" | "to") => (
        <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {cities.map((city) => (
                <div
                    key={city.code}
                    role="button"
                    tabIndex={0}
                    className={`p-2 cursor-pointer hover:bg-blue-50 ${
                        city.code === (type === "from" ? toCity.code : fromCity.code) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleCitySelect(city, type)}
                    onKeyDown={(e) => e.key === "Enter" && handleCitySelect(city, type)}
                >
                    <div className="font-bold">{city.code}</div>
                    <div className="text-xs">{city.name}</div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full">
            <div className="flex flex-nowrap items-center gap-4 w-full">
                {(["from", "to"] as const).map((type) => (
                    <div key={type} className="relative flex-1 min-w-[140px] h-16 z-10">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            {type.toUpperCase()}
                        </label>
                        <div
                            role="button"
                            tabIndex={0}
                            className="p-2 border rounded-lg cursor-pointer hover:border-blue-500 h-10"
                            onClick={() =>
                                setShowDropdown((prev) => ({
                                    from: type === "from" ? !prev.from : false,
                                    to: type === "to" ? !prev.to : false,
                                }))
                            }
                            onKeyDown={(e) => e.key === "Enter" &&
                                setShowDropdown((prev) => ({
                                    from: type === "from" ? !prev.from : false,
                                    to: type === "to" ? !prev.to : false,
                                }))
                            }
                        >
                            <div className="flex items-center justify-between h-6">
                                <div>
                                    <div className="text-sm font-bold">
                                        {type === "from" ? fromCity.code : toCity.code}
                                    </div>
                                    <div className="text-xs text-gray-600 truncate max-w-32">
                                        {type === "from" ? fromCity.name : toCity.name}
                                    </div>
                                </div>
                                <Plane className="text-blue-500 h-4 w-4" />
                            </div>
                        </div>
                        {showDropdown[type] && renderCityDropdown(type)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightCities;