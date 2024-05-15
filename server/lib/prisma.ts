import { calculateDiffBetweenDates, calculateOptimalIndex } from '@/lib/utils';
import { PrismaClient } from '@prisma/client';

// This function checks if a PrismaClient instance exists in the global scope,
// and if not, creates and stores it. This way, the same instance is reused.
const prismaClientSingleton = (): PrismaClient => {
  // Check if the instance already exists in the global namespace
  if (!globalThis.prisma) {
    // Assign a new instance if it doesn't exist
    // @ts-ignore
    globalThis.prisma = new PrismaClient().$extends({
      query: {
        ticket: {
          async create({ args, query }) {
            // Add custom logic here
            const flights = args.data.flights?.create;

            // Calculate dynamic fields for filtering and sorting
            let totalDuration = 0;
            let totalTransfers = 0;
            let optimalIndex = 0;

            if (Array.isArray(flights)) {
              if (Array.isArray(flights[0].transfers?.connect)) {
                totalTransfers = flights[0].transfers.connect.length;
              }
              flights.forEach((flight) => {
                // Calculate the duration of each flight
                flight.duration = calculateDiffBetweenDates(String(flight.departureTime), String(flight.arrivalTime));
                totalDuration += flight.duration || 0;
              });
              optimalIndex = calculateOptimalIndex(totalDuration, totalTransfers, args.data.price);
            }

            return query({
              ...args,
              data: {
                ...args.data,
                totalDuration,
                totalTransfers,
                optimalIndex,
              },
            });
          },
        },
      },
    });

    // Log the creation in non-production environments for debugging purposes
    if (process.env.NODE_ENV !== 'production') {
      console.log('Created new instance of PrismaClient');
    }
  }
  return globalThis.prisma;
};

// Make the singleton instance available for import
export const prisma = prismaClientSingleton();

// Extend the Node.js global type with the PrismaClient instance
// This is a TypeScript specific extension for better type safety
declare global {
  // noinspection ES6ConvertVarToLetConst
  var prisma: PrismaClient;
}
