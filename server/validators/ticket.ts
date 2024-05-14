import { z } from 'zod';

export const ticketCreateSchema = z.object({
  price: z.number(),
  airlineId: z.number(),
  flights: z.array(
    z.object({
      number: z.string(),
      departureTime: z.string(),
      arrivalTime: z.string(),
      transferIds: z.array(z.number()),
      fromId: z.number(),
      toId: z.number(),
    }),
  ),
});
