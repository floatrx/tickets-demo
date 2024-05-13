import type { FlightCreateBody } from '@/types';
import { Prisma } from '@prisma/client';

type TransformFlightFn = (body: FlightCreateBody) => Prisma.FlightCreateInput;

export const diffBetweenDates = (departure: Date, arrival: Date) =>
  new Date(arrival).getTime() - new Date(departure).getTime();

/**
 * Transform flight data for Prisma
 */
export const transformFlights: TransformFlightFn = ({ number, departureTime, arrivalTime, ...f }) => ({
  number,
  departureTime,
  arrivalTime,
  duration: diffBetweenDates(departureTime, arrivalTime),
  transfers: { connect: f.transferIds.map((id: number) => ({ id })) },
  from: { connect: { id: f.fromId } },
  to: { connect: { id: f.toId } },
});
