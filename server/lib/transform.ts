import type { TicketFlightCreateBody } from '@/types/ticket';
import { Prisma } from '@prisma/client';

type TransformFlightFn = (body: TicketFlightCreateBody) => Prisma.FlightCreateInput;

/**
 * Transform flight data for Prisma
 */
export const transformFlights: TransformFlightFn = ({ number, departureTime, arrivalTime, ...f }) => ({
  number,
  departureTime,
  arrivalTime,
  transfers: { connect: f.transferIds.map((id: number) => ({ id })) },
  from: { connect: { id: f.fromId } },
  to: { connect: { id: f.toId } },
});
