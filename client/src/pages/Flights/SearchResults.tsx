import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultCard } from "./ResultCard";
import { flights } from "../../data/flight";
import { ArrowLeft, Filter } from "lucide-react";

const FlightSearchResults: React.FC = () => {
    const navigate = useNavigate();
    const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>("price");

    // Sort flights based on selected criteria
    const sortedFlights = [...flights].sort((a, b) => {
        switch (sortBy) {
            case "price":
                return a.price - b.price;
            case "duration":
                return a.duration.localeCompare(b.duration);
            case "departure":
                return a.departureTime.localeCompare(b.departureTime);
            case "arrival":
                return a.arrivalTime.localeCompare(b.arrivalTime);
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Search</span>
                    </button>

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Flight Search Results
                    </h1>

                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-600" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
                        >
                            <option value="price">Sort by: Price</option>
                            <option value="duration">Sort by: Duration</option>
                            <option value="departure">Sort by: Departure</option>
                            <option value="arrival">Sort by: Arrival</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-wrap gap-2 text-sm">
                        <span className="font-medium text-gray-700">Filters:</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                            Non-stop only
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                            Refundable
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                            Morning Departure
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {sortedFlights.map((flight) => (
                        <ResultCard
                            key={flight.id}
                            flight={flight}
                            isSelected={selectedFlight === flight.id}
                            onSelect={() => setSelectedFlight(flight.id)}
                        />
                    ))}
                </div>

                {selectedFlight && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Selected flight:</p>
                            <p className="font-medium">
                                {flights.find((f) => f.id === selectedFlight)?.airline} -{" "}
                                {flights.find((f) => f.id === selectedFlight)?.flightNumber}
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                alert(`Proceeding to book flight ${selectedFlight}`)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
                        >
                            Continue to Book
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightSearchResults;