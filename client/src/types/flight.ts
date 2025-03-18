export interface City {
    code: string;
    name: string;
    airport: string;
  }
  
  export interface Travelers {
    adults: number;
    children: number;
    infants: number;
  }
  
  export interface Flight {
    id: string
    airline: string
    airlineCode?: string
    flightNumber?: string
    onTimePerformance: number
    departureTime: string
    departureDate?: string
    origin: string
    originCode?: string
    duration: string
    stops: string
    arrivalTime: string
    arrivalDate?: string
    destination: string
    destinationCode?: string
    price: number
    currency?: string
    refundable?: boolean
    refundableText?: string
    fareDetails?: {
      baseFare: number
      taxes: number
      perPassenger: number
      total: number
      adultCount?: number
      infantCount?: number
      childCount?: number
      adultFare?: number
      infantFare?: number
      childFare?: number
    }
  }
  
  export interface FlightCardProps {
    flight: Flight
    isSelected: boolean
    onSelect: () => void
  }
  
  