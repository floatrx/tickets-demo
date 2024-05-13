import { Flight, Ticket } from '@prisma/client';

export interface FlightCreateBody extends Omit<Flight, 'id' | 'ticketId'> {
  transferIds: number[];
  fromId: number;
  toId: number;
}

export interface TicketCreateBody extends Omit<Ticket, 'id'> {
  flights: FlightCreateBody[];
  airlineId: number;
  price: number;
}

export interface ITicketFilters {
  limit?: number;
  sort?: 'price' | 'duration' | 'optimal';
  filter?: 'transfers';
  transferCount?: number | string[];
}
