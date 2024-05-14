import { prisma } from '@/lib/prisma';
import { transformFlights } from '@/lib/transform';
import type { ITicketFilters, TicketCreateBody } from '@/types';
import type { Prisma, Ticket } from '@prisma/client';

// Include related data in the response
const include: Prisma.TicketInclude = {
  airline: true, // Include the airline data
  flights: {
    orderBy: { departureTime: 'asc' }, // Order flights by departure time
    include: {
      from: true, // Include the "from" country
      to: true, // Include the "to" country
      transfers: true, // Include transfers if any
    },
  },
};

/**
 * Post CRUD operations
 */
export const ticketRepo = {
  create(body: TicketCreateBody) {
    const { flights, airlineId, price = 0 } = body;
    return prisma.ticket.create({
      include, // Include the related data
      data: {
        price,
        totalTransfers: flights[0].transferIds.length, // Get the number of transfers
        airline: { connect: { id: airlineId } },
        flights: {
          create: flights.map(transformFlights),
        },
      },
    });
  },
  get(id: string) {
    return prisma.ticket.findUnique({ where: { id: Number(id) }, include });
  },
  async list(query: ITicketFilters) {
    /**
     * Get search params from request
     * @param sort = 'price' (default) | 'duration' | 'optimal'
     * @param filter = 'all' (default) | 'transfers' + required transferCount
     * @param transferCount = ['0', '1', '2', '3'] string[] | 0 or 1 or 2 or 3 (number)
     */
    const { sort, filter, transferCount = [], limit } = query;

    const ticketsTotal = await prisma.ticket.count(); // Get the total number of tickets

    /**
     * Filter by transfers
     * @param filter = 'transfers'
     * @param transferCount = ['0', '1', '2', '3'] string[] | 0 or 1 or 2 or 3 (number)
     */
    const where =
      filter === 'transfers' && transferCount
        ? {
            totalTransfers: {
              in: Array.isArray(transferCount) ? transferCount.map(Number) : [Number(transferCount)],
            },
          }
        : {};

    // Query
    const ticketsCount = await prisma.ticket.count({ where }); // Get the total number of tickets
    const tickets = await prisma.ticket.findMany({
      include,
      where,
      take: Number(limit) || 5, // Limit the number of tickets
    });

    // Map tickets to include total duration
    let ticketsExtended = tickets.map(({ id, ...ticket }) => {
      const totalDuration = ticket.flights.reduce((acc, flight) => acc + (flight.duration || 0), 0);

      // Calculate the custom coefficient optimalIdx
      const optimalIdx = (totalDuration / 1000000 + 2 * ticket.totalTransfers + 3 * ticket.price).toFixed();

      return {
        id,
        optimalIdx,
        totalDuration,
        ...ticket,
      };
    });

    /**
     * Sort tickets
     * @param sort = 'price' | 'duration' | 'optimal'
     */
    ticketsExtended.sort((a, b) => {
      switch (sort) {
        case 'duration':
          return a.totalDuration - b.totalDuration; // sort by duration
        case 'optimal':
          return Number(a.optimalIdx) - Number(b.optimalIdx); // sort by custom coefficient K
        default:
          return a.price - b.price; // sort by price
      }
    });

    return { data: ticketsExtended, total: ticketsTotal, count: ticketsCount };
  },
  update(id: number, data: Omit<Ticket, 'id'>) {
    return prisma.ticket.update({ where: { id }, data, include });
  },
  remove(id: number) {
    return prisma.ticket.delete({ where: { id } });
  },
};
