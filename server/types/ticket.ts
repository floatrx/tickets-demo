import type { FlightCreateBody } from '@/types/flight';
import { Flight, Ticket } from '@prisma/client';

export type ITicketExtended = Ticket & {
  flights: Flight[];
};

export interface TicketCreateBody extends Omit<Ticket, 'id'> {
  flights: FlightCreateBody[];
  airlineId: number;
  price: number;
}

export type ITicketSort = 'price' | 'duration' | 'optimal';
export type ITicketFilter = 'transfers';

export interface ITicketFilters {
  limit?: number;
  sort?: ITicketSort;
  filter?: ITicketFilter;
  transferCount?: number | string[];
}
