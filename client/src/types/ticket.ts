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
  totalDuration: number;
  totalTransfers: number;
  optimalIndex: number; // custom coefficient for optimal sorting
}

export interface ITicketCreate {
  price: number;
  flights: [CreateFlightBody, CreateFlightBody?];
}

export type ITicketSort = 'price' | 'duration' | 'transfers' | 'optimal' | null;
export type TicketFilter = 'all' | 'transfers' | null;

export interface ITicketListFilters {
  limit?: number;
  sort: ITicketSort;
  filter?: TicketFilter;
  transferCount?: number[] | null;
}
