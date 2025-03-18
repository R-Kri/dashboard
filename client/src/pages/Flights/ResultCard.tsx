"use client"

import type React from "react"
import { useState } from "react"
import { Clock, ChevronDown, ChevronUp, Plane } from "lucide-react"
import type { FlightCardProps } from "../../types/flight"
import AirIndiaLogo from "../../assets/logo/AirIndia.jpeg"
import IndigoLogo from "../../assets/logo/Indigo.png"
import SpiceJetLogo from "../../assets/logo/spicejet.png"
import VistaraLogo from "../../assets/logo/vistara.svg"

const airlineLogos: Record<string, string> = {
    "Air India": AirIndiaLogo,
    IndiGo: IndigoLogo,
    SpiceJet: SpiceJetLogo,
    Vistara: VistaraLogo,
}


export const ResultCard: React.FC<FlightCardProps> = ({ flight, isSelected, onSelect }) => {
    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowDetails(!showDetails)
    }

    const handleBookNow = (e: React.MouseEvent) => {
        e.stopPropagation()
        alert(`Booking flight ${flight.airline} from ${flight.origin} to ${flight.destination}`)
    }

    const formatCurrency = (amount: number) => {
        const currency = flight.currency || "₹"
        return `${currency} ${amount.toLocaleString()}`
    }

    return (
        <div className="mb-4">
            <div
                onClick={onSelect}
                className={`rounded-lg border bg-white shadow-md transition-all duration-300 cursor-pointer overflow-hidden
            ${isSelected ? "border-2 border-blue-500" : "border border-gray-200"}`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1">
                                <img
                                    src={airlineLogos[flight.airline] || "/placeholder.svg?height=40&width=40"}
                                    alt={flight.airline}
                                    className="h-10 w-10 object-contain"
                                />
                            </div>
                            <div>
                                <span className="font-medium text-lg">{flight.airline}</span>
                                {flight.flightNumber && <p className="text-xs text-gray-500">{flight.flightNumber}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{flight.onTimePerformance}% on time</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{flight.departureTime}</span>
                            <span className="text-sm text-gray-500">{flight.origin}</span>
                            {flight.originCode && <span className="text-xs text-gray-400">({flight.originCode})</span>}
                            {flight.departureDate && <span className="text-xs text-gray-500 mt-1">{flight.departureDate}</span>}
                        </div>

                        <div className="flex flex-col items-center mx-4 flex-grow">
                            <span className="text-sm text-gray-500">{flight.duration}</span>
                            <div className="relative w-full flex items-center my-2">
                                <div className="h-[2px] bg-gray-300 w-full"></div>
                                <Plane className="absolute text-blue-500 h-4 w-4 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                            </div>
                            <span className="text-xs text-gray-500">{flight.stops}</span>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold">{flight.arrivalTime}</span>
                            <span className="text-sm text-gray-500">{flight.destination}</span>
                            {flight.destinationCode && <span className="text-xs text-gray-400">({flight.destinationCode})</span>}
                            {flight.arrivalDate && <span className="text-xs text-gray-500 mt-1">{flight.arrivalDate}</span>}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-blue-600">{formatCurrency(flight.price)}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">per adult</span>
                                {flight.refundable !== undefined && (
                                    <span className={`text-xs ${flight.refundable ? "text-green-500" : "text-red-500"}`}>
                                        {flight.refundableText || (flight.refundable ? "Refundable" : "Non-Refundable")}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleDetails}
                                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                            >
                                Details {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            <button
                                onClick={handleBookNow}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Expandable details section */}
                {showDetails && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">Flight Details</h3>
                                <div className="bg-white p-3 rounded-md shadow-sm">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Flight:</span> {flight.airline} {flight.flightNumber}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Aircraft:</span> Standard
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Class:</span> Economy
                                    </p>
                                </div>
                            </div>

                            {flight.fareDetails && (
                                <div>
                                    <h3 className="font-medium text-gray-700 mb-2">Fare Breakdown</h3>
                                    <div className="bg-white p-3 rounded-md shadow-sm">
                                        <table className="w-full text-sm">
                                            <thead className="text-gray-600 border-b">
                                                <tr>
                                                    <th className="text-left py-2">Fare Summary</th>
                                                    <th className="text-left py-2">Base Fare</th>
                                                    <th className="text-left py-2">Taxes + Fees</th>
                                                    <th className="text-left py-2">Per Passenger</th>
                                                    <th className="text-left py-2">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {flight.fareDetails.adultCount && flight.fareDetails.adultCount > 0 && (
                                                    <tr className="border-b border-gray-100">
                                                        <td className="py-2">Adult</td>
                                                        <td className="py-2">{formatCurrency(flight.fareDetails.baseFare)}</td>
                                                        <td className="py-2">{formatCurrency(flight.fareDetails.taxes)}</td>
                                                        <td className="py-2">{formatCurrency(flight.fareDetails.perPassenger)}</td>
                                                        <td className="py-2">
                                                            {formatCurrency(flight.fareDetails.adultFare || flight.fareDetails.perPassenger)}
                                                        </td>
                                                    </tr>
                                                )}
                                                {flight.fareDetails.infantCount &&
                                                    flight.fareDetails.infantCount > 0 &&
                                                    flight.fareDetails.infantFare && (
                                                        <tr className="border-b border-gray-100">
                                                            <td className="py-2">Infant</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.baseFare / 4)}</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.taxes / 5)}</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.infantFare)}</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.infantFare)}</td>
                                                        </tr>
                                                    )}
                                                {flight.fareDetails.childCount &&
                                                    flight.fareDetails.childCount > 0 &&
                                                    flight.fareDetails.childFare && (
                                                        <tr className="border-b border-gray-100">
                                                            <td className="py-2">Child</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.baseFare)}</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.taxes)}</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.childFare)}</td>
                                                            <td className="py-2">{formatCurrency(flight.fareDetails.childFare)}</td>
                                                        </tr>
                                                    )}
                                                <tr className="font-medium text-blue-600">
                                                    <td className="py-2">Total</td>
                                                    <td colSpan={3}></td>
                                                    <td className="py-2">{formatCurrency(flight.fareDetails.total)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
