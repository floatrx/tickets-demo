import { PrismaClient } from '@prisma/client';

// This function checks if a PrismaClient instance exists in the global scope,
// and if not, creates and stores it. This way, the same instance is reused.
const prismaClientSingleton = (): PrismaClient => {
  // Check if the instance already exists in the global namespace
  if (!globalThis.prisma) {
    // Assign a new instance if it doesn't exist
    globalThis.prisma = new PrismaClient();

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
  var prisma: PrismaClient | undefined;
}
