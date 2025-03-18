import { useState } from "react";
import FlightDates from "./FlightDates";
import TicketType from "./TicketType";
import FlightCities from "./FlightCities";
import FlightClass from "./FlightClass";
import FareContainer from "./FareContainer";

const FlightSearch: React.FC = () => {
    const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <TicketType isRoundTrip={isRoundTrip} setIsRoundTrip={setIsRoundTrip} />
            <div className="flex flex-col md:flex-row gap-3 p-5 mx-6 bg-white rounded-xl shadow-lg">
                <div className="w-full md:w-2/5">
                    <FlightCities />
                </div>
                <div className="w-full md:w-2/5">
                    <FlightDates isRoundTrip={isRoundTrip} setIsRoundTrip={setIsRoundTrip} />
                </div>
                <div className="w-full md:w-1/5">
                    <FlightClass />
                </div>
            </div>
            <FareContainer />
            

        </div>
    );
};

export default FlightSearch;