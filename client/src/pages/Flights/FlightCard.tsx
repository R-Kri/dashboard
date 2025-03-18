interface FlightCardProps {
    flight: {
      id: number
      airline: string
      onTimePerformance: number
      departureTime: string
      origin: string
      duration: string
      stops: string
      arrivalTime: string
      destination: string
      price: number
    }
    isSelected: boolean
    onSelect: () => void
  }
  
  export function FlightCard({ flight, isSelected, onSelect }: FlightCardProps) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
          isSelected ? "border-2 border-blue-500" : ""
        }`}
        onClick={onSelect}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg">{flight.airline}</div>
            <div className="text-sm text-gray-600">
              {flight.origin} to {flight.destination}
            </div>
          </div>
          <div className="text-xl font-bold">${flight.price}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <div className="text-sm">Departure: {flight.departureTime}</div>
            <div className="text-sm">Arrival: {flight.arrivalTime}</div>
          </div>
          <div>
            <div className="text-sm">Duration: {flight.duration}</div>
            <div className="text-sm">Stops: {flight.stops}</div>
          </div>
        </div>
      </div>
    )
  }
  
  