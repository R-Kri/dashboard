import React, { useState } from "react";
import { Users } from "lucide-react";
import { CABIN_CLASSES, TRAVELLER_LIMITS } from "../../data/constants";

type TravellerType = "adults" | "children" | "infants";

const FlightClass: React.FC = () => {
    const [showTravellerMenu, setShowTravellerMenu] = useState(false);
    const [travellers, setTravellers] = useState<Record<TravellerType, number>>({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const [cabinClass, setCabinClass] = useState(CABIN_CLASSES[0]);

    const getTotalTravellers = (): number => 
        travellers.adults + travellers.children + travellers.infants;

    const updateTravellers = (type: TravellerType, increment: boolean) => {
        setTravellers((prev) => ({
            ...prev,
            [type]: Math.max(
                TRAVELLER_LIMITS[type].min,
                Math.min(TRAVELLER_LIMITS[type].max, prev[type] + (increment ? 1 : -1))
            ),
        }));
    };

    return (
        <div className="relative w-full h-16">
            <label className="block text-xs font-medium text-gray-600 mb-1">
                TRAVELLERS & CLASS
            </label>
            <div
                className="p-2 border rounded-lg cursor-pointer hover:border-blue-500 h-10"
                onClick={() => setShowTravellerMenu(!showTravellerMenu)}
            >
                <div className="flex items-center justify-between h-6">
                    <div>
                        <div className="text-sm">{getTotalTravellers()} Traveller(s)</div>
                        <div className="text-xs text-gray-600">{cabinClass}</div>
                    </div>
                    <Users className="text-blue-500 h-4 w-4" />
                </div>
            </div>

            {showTravellerMenu && (
                <div className="absolute z-20 right-0 mt-1 bg-white border rounded-lg shadow-lg p-4 w-72">
                    {/* Travellers Selection */}
                    <div className="space-y-3">
                        {Object.entries(TRAVELLER_LIMITS).map(([type, { label, subtitle }]) => (
                            <div key={type} className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium">{label}</div>
                                    <div className="text-xs text-gray-500">{subtitle}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateTravellers(type as TravellerType, false)}
                                        className="px-2 py-1 border rounded-lg text-sm"
                                        disabled={travellers[type as TravellerType] <= TRAVELLER_LIMITS[type as TravellerType].min}
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center text-sm">{travellers[type as TravellerType]}</span>
                                    <button
                                        onClick={() => updateTravellers(type as TravellerType, true)}
                                        className="px-2 py-1 border rounded-lg text-sm"
                                        disabled={travellers[type as TravellerType] >= TRAVELLER_LIMITS[type as TravellerType].max}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Cabin Class Selection */}
                        <div className="border-t pt-3">
                            <div className="text-sm font-medium mb-2">Cabin Class</div>
                            <div className="grid grid-cols-2 gap-2">
                                {CABIN_CLASSES.map((className) => (
                                    <button
                                        key={className}
                                        onClick={() => {
                                            setCabinClass(className);
                                            setShowTravellerMenu(false);
                                        }}
                                        className={`p-1 rounded-lg text-xs ${
                                            cabinClass === className
                                                ? "bg-blue-500 text-white"
                                                : "border hover:border-blue-500"
                                        }`}
                                    >
                                        {className}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightClass;