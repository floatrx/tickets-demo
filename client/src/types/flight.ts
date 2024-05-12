interface Transfer {
  id: number;
  name: string;
  description: string;
}

interface Direction {
  id: number;
  name: string;
}

export interface FlightDetails {
  id: number;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  airlineId: number;
  directionId: number;
}

export interface FlightDetailsExtended extends FlightDetails {
  direction: Direction;
  transfers: Transfer[];
}

export interface CreateFlightBody extends Omit<FlightDetails, 'id'> {
  transferIds: number[];
}
