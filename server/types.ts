import { Ticket, Flight } from '@prisma/client';

export interface FlightCreateBody extends Omit<Flight, 'id' | 'ticketId'> {
  transferIds: number[];
}

export interface TicketCreateBody extends Omit<Ticket, 'id'> {
  flights: FlightCreateBody[];
  price: number;
}
