import { z } from 'zod';

// Parse and validate UTC date-time string
const validUTCDate = z.string().transform((value) => {
  const regex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)$/;
  if (!regex.test(value)) {
    throw new Error('Invalid date-time format');
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new Error('Error parsing date');
  }
  return date; // returns Date object if transformation is successful
});

/**
 * Ticket create schema validation
 */
export const ticketCreateSchema = z.object({
  price: z.number().min(100, {
    message: 'Price must be at least 100',
  }),
  airlineId: z
    .number()
    .max(3, {
      message: 'Airline ID must be less than 3 (temporary)',
    })
    .min(1),
  flights: z.array(
    z.object({
      number: z.string(),
      departureTime: validUTCDate,
      arrivalTime: validUTCDate,
      transferIds: z
        .array(
          z.number().max(4, {
            message: 'Transfer ID must be less than 4 (temporary)',
          }),
        )
        .min(1),
      fromId: z.number(),
      toId: z.number(),
    }),
  ),
});

/**
 * Ticket search schema validation
 * @param sort = 'price' (default) | 'duration' | 'optimal'
 * @param filter = 'all' (default) | 'transfers' + required transferCount
 * @param transferCount = ['0', '1', '2', '3'] string[] | 0 or 1 or 2 or 3 (number)
 */
export const ticketSearchSchema = z
  .object({
    limit: z
      .string()
      .optional()
      .transform((value, x) => {
        if (!value) return value;
        const parsed = parseInt(value);
        // Check if the limit is a valid number
        if (isNaN(parsed)) {
          throw new Error('Limit must be a valid number');
        }
        // Check if the limit is less than 100
        if (parsed > 100) {
          throw new Error('Limit must be less than 100');
        }
        return parsed;
      }),
    sort: z.enum(['price', 'duration', 'optimal']).optional(),
    filter: z.enum(['transfers']).optional(),
    transferCount: z
      .preprocess(
        (input) => {
          // Check if input is already in array form or not, transform to array if it's a single number
          if (typeof input === 'string') {
            const parsed = parseInt(input);
            if (isNaN(parsed)) {
              throw new Error('Transfer count must be a valid number');
            }
            return parsed;
          }
          if (Array.isArray(input)) {
            return input.map((item) => {
              const parsed = parseInt(item);
              if (isNaN(parsed)) {
                throw new Error('One of the transfer counts is not a valid number');
              }
              return parsed;
            });
          }
          return input;
        },
        z.union([z.number().max(3), z.array(z.number().max(3))]),
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.filter === 'transfers' && data.transferCount === undefined) {
        throw new Error("transferCount is required when filter is 'transfers'");
      }
      return true;
    },
    {
      message: "Transfer count must be specified if the filter is set to 'transfers'",
    },
  );
