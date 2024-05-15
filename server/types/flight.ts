import { Flight } from '@prisma/client';

export interface FlightCreateBody extends Omit<Flight, 'id' | 'ticketId'> {
  transferIds: number[];
  fromId: number;
  toId: number;
}
