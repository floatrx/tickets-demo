import type { CreateFlightBody, FlightDetailsExtended } from '@/types/flight';

interface IAirline {
  id: number;
  name: string;
  logo: string;
}

export interface ITicket {
  id: number;
  price: number;
  airline: IAirline;
  flights: FlightDetailsExtended[];
  totalDuration: number;
  totalTransfers: number;
  optimalIndex: number; // custom coefficient for optimal sorting
}

export interface ITicketCreate {
  price: number;
  flights: [CreateFlightBody, CreateFlightBody?];
}

export type TTicketSort = 'price' | 'duration' | 'transfers' | 'optimal' | null;
export type TTicketFilter = 'all' | 'transfers' | null;
export type TTicketTransferCount = number[] | null;

export interface ITicketListSearchParams {
  limit?: number | null;
  sort: TTicketSort;
  filter?: TTicketFilter;
  transferCount?: TTicketTransferCount;
}
