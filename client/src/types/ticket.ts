import type { CreateFlightBody, FlightDetailsExtended } from '@/types/flight';

interface Airline {
  id: number;
  name: string;
  logo: string;
}

export interface ITicket {
  id: number;
  price: number;
  airline: Airline;
  flights: FlightDetailsExtended[];
}

export interface ITicketCreate {
  price: number;
  flights: [CreateFlightBody, CreateFlightBody?];
}
