import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
    mode: "one-way" | "round-trip";
    startDate: Date | null;
    endDate: Date | null;
    onChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
    onModeChange?: (mode: "one-way" | "round-trip") => void;
    startLabel: string;
    endLabel: string;
    minDate?: Date;
    isEndDateMandatory?: boolean;
    [key: string]: unknown;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
    mode = "round-trip",
    startDate,
    endDate,
    onChange,
    onModeChange,
    startLabel,
    endLabel = "Return Date",
    minDate = new Date(),
    isEndDateMandatory = false,
    ...props
}) => {
    const handleEndDateClick = () => {
        if (mode === "one-way" && onModeChange) {
            onModeChange("round-trip");
        }
    };

    return (
        <div className="w-full h-16">
            <div className="flex gap-4 w-full">
                <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">{startLabel.toUpperCase()}</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => onChange({ startDate: date, endDate })}
                        placeholderText={startLabel}
                        className="border p-2 rounded-lg w-full h-10 text-sm"
                        minDate={minDate}
                        dateFormat="dd MMM yyyy"
                        {...props}
                    />
                </div>
                <div 
                    onClick={mode === "one-way" ? handleEndDateClick : undefined} 
                    className={`w-1/2 ${mode === "one-way" ? "cursor-pointer" : ""}`}
                >
                    <label className="block text-xs font-medium text-gray-600 mb-1">{endLabel.toUpperCase()}</label>
                    {mode === "round-trip" ? (
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => onChange({ startDate, endDate: date })}
                            placeholderText={endLabel}
                            className="border p-2 rounded-lg w-full h-10 text-sm"
                            minDate={startDate || minDate}
                            dateFormat="dd MMM yyyy"
                            {...props}
                            required={isEndDateMandatory}
                        />
                    ) : (
                        <div className="border p-2 rounded-lg w-full h-10 flex items-center text-sm text-gray-500">
                            Tap to add a return date
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomDatePicker;