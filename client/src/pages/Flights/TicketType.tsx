import { useState, useEffect } from "react";
import { ticketTypes } from "../../types/TicketTypes";

interface TicketTypeProps {
    isRoundTrip: boolean;
    setIsRoundTrip: (value: boolean) => void;
}

const TicketType: React.FC<TicketTypeProps> = ({ isRoundTrip, setIsRoundTrip }) => {
    const [selectedTicket, setSelectedTicket] = useState<string>(isRoundTrip ? "round-trip" : "one-way");

    useEffect(() => {
        setSelectedTicket(isRoundTrip ? "round-trip" : "one-way");
    }, [isRoundTrip]);

    const handleSelection = (value: string) => {
        setSelectedTicket(value);
        setIsRoundTrip(value === "round-trip");
    };

    return (
        <div className="bg-white py-2 px-4 rounded-lg mt-10">
            <ul className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {ticketTypes.map((option) => (
                    <li
                        key={option.value}
                        className={`flex items-center gap-2 cursor-pointer p-2 rounded-full transition-colors duration-200 ${
                            selectedTicket === option.value ? "bg-blue-300 font-semibold" : ""
                        }`}
                        onClick={() => handleSelection(option.value)}
                    >
                        <input
                            type="radio"
                            name="ticketType"
                            value={option.value}
                            checked={selectedTicket === option.value}
                            onChange={() => handleSelection(option.value)}
                            className="cursor-pointer"
                        />
                        {option.icon && <option.icon className="h-4 w-4" />}
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketType;