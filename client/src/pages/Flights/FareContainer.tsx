import React, { useState } from "react";
import { fares } from "../../data/fares";

interface Fare {
    value: string;
    title: string;
    description: string;
}

const FareContainer: React.FC = () => {
    const [selectedFare, setSelectedFare] = useState<string>("regular");

    const handleFare = (value: string) => {
        setSelectedFare(value);
    };

    return (
        <div className="mt-3 mx-4 md:p-3 mb-3 bg-white rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-9">
                <div className="mb-4 md:mb-0 md:mr-4">
                    <h2 className="font-bold text-lg mb-2">Select a special fare</h2>
                    <span className="inline-block text-white px-2 py-1 text-sm rounded bg-green-600 font-bold">
                        EXTRA SAVINGS
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 flex-wrap">
                    {fares.map((fare: Fare) => (
                        <div
                            key={fare.value}
                            className={`${selectedFare === fare.value ? "bg-blue-100" : "bg-gray-50"
                                } flex items-start p-2 rounded border border-gray-300 cursor-pointer transition-colors duration-200 hover:bg-blue-50`}
                            onClick={() => handleFare(fare.value)}
                        >
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="fare"
                                    value={fare.value}
                                    checked={selectedFare === fare.value}
                                    onChange={() => handleFare(fare.value)}
                                    className="mr-3 transform scale-100"
                                />
                                <div>
                                    <div className="font-semibold text-sm md:text-base">{fare.title}</div>
                                    <div className="text-xs text-gray-600">{fare.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FareContainer;