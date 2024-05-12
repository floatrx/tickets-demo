import type { CreateFlightBody, FlightsExtended } from '@/types/flights';

export interface ITicket {
  id: number;
  price: number;
  flights: FlightsExtended[];
}

export interface ITicketCreate {
  price: number;
  flights: [CreateFlightBody, CreateFlightBody?];
}
