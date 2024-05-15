import { type Airline, Flight, Ticket } from '@prisma/client';

export interface ITicketExtended extends Ticket {
  flights: Flight[];
  airline: Airline;
}

// Create
export interface TicketFlightCreateBody extends Omit<Flight, 'id' | 'ticketId'> {
  transferIds: number[];
  fromId: number;
  toId: number;
}
export interface TicketCreateBody extends Omit<Ticket, 'id'> {
  flights: TicketFlightCreateBody[];
  airlineId: number;
  price: number;
}
export interface ITicketCreateResponse extends ITicketExtended {}

// Search
export interface ITicketSearchResponse {
  data: ITicketExtended[];
  total: number;
  count: number;
}
export type ITicketSort = 'price' | 'duration' | 'optimal';
export type ITicketFilter = 'transfers';
export interface ITicketFilters {
  limit?: number;
  sort?: ITicketSort;
  filter?: ITicketFilter;
  transferCount?: number | string[];
}
