import { useState, useEffect } from "react";
import CustomDatePicker from "../Flights/CustomDatePicker";

interface FlightDatesProps {
    isRoundTrip: boolean;
    setIsRoundTrip: (value: boolean) => void;
}

const FlightDates: React.FC<FlightDatesProps> = ({ isRoundTrip, setIsRoundTrip }) => {
    const [dates, setDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        
        // Always keep endDate populated, even in one-way mode
        setDates({ startDate: today, endDate: tomorrow });
    }, []);

    const handleDateChange = (newDates: { startDate: Date | null; endDate?: Date | null }) => {
        setDates({
            startDate: newDates.startDate,
            endDate: newDates.endDate ?? dates.endDate,
        });
    };

    const handleModeChange = (mode: "one-way" | "round-trip") => {
        setIsRoundTrip(mode === "round-trip");
    };

    return (
        <div className="w-full">
            <CustomDatePicker
                mode={isRoundTrip ? "round-trip" : "one-way"}
                startDate={dates.startDate}
                endDate={dates.endDate}
                onChange={handleDateChange}
                onModeChange={handleModeChange}
                startLabel="Departure"
                endLabel="Return Date"
            />
        </div>
    );
};

export default FlightDates;