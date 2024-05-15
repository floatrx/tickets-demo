import { Flight, Ticket } from '@prisma/client';

export interface FlightCreateBody extends Omit<Flight, 'id' | 'ticketId'> {
  transferIds: number[];
  fromId: number;
  toId: number;
}

export type ITicketExtended = Ticket & {
  flights: Flight[];
};

export interface TicketCreateBody extends Omit<Ticket, 'id'> {
  flights: FlightCreateBody[];
  airlineId: number;
  price: number;
}

export type ITicketSort = 'price' | 'duration' | 'optimal';

export interface ITicketFilters {
  limit?: number;
  sort?: ITicketSort;
  filter?: 'transfers';
  transferCount?: number | string[];
}
