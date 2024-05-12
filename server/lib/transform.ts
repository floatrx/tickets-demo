import type { FlightCreateBody } from '@/types';
import { Prisma } from '@prisma/client';

type TransformFlightFn = (body: FlightCreateBody) => Prisma.FlightCreateInput;

/**
 * Transform flight data for Prisma
 */
export const transformFlights: TransformFlightFn = ({ number, departureTime, arrivalTime, duration, ...f }) => ({
  number,
  departureTime,
  arrivalTime,
  duration,
  airline: { connect: { id: f.airlineId } },
  direction: { connect: { id: f.directionId } },
  transfers: { connect: f.transferIds.map((id: number) => ({ id })) },
});
