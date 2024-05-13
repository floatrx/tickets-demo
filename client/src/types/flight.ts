import type { Country } from '@/types/country';

export interface FlightDetails {
  id: number;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  airlineId: number;
  fromId: number;
  toId: number;
}

export interface FlightDetailsExtended extends FlightDetails {
  transfers: Country[];
  from: Country;
  to: Country;
}

export interface CreateFlightBody extends Omit<FlightDetails, 'id'> {}
