import type { FlightCreateBody } from '@/types';
import { Prisma } from '@prisma/client';

type TransformFlightFn = (body: FlightCreateBody) => Prisma.FlightCreateInput;

const diffBetweenDates = (departure: Date, arrival: Date) => (arrival.getTime() - departure.getTime()) / (1000 * 60);

/**
 * Transform flight data for Prisma
 */
export const transformFlights: TransformFlightFn = ({ number, departureTime, arrivalTime, ...f }) => ({
  number,
  departureTime,
  arrivalTime,
  duration: diffBetweenDates(new Date(departureTime), new Date(arrivalTime)),
  direction: { connect: { id: f.directionId } },
  transfers: { connect: f.transferIds.map((id: number) => ({ id })) },
});
