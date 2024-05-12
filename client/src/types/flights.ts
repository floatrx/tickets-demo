interface Transfer {
  id: number;
  name: string;
  description: string;
}

interface Direction {
  id: number;
  name: string;
}

interface Airline {
  id: number;
  name: string;
}

export interface Flights {
  id: number;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  airlineId: number;
  directionId: number;
}

export interface FlightsExtended extends Flights {
  airline: Airline;
  direction: Direction;
  transfers: Transfer[];
}

export interface CreateFlightBody extends Omit<Flights, 'id'> {
  transferIds: number[];
}
