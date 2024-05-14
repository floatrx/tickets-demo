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

    const ticketsCount = await prisma.ticket.count(); // Get the total number of tickets

    const tickets = await prisma.ticket.findMany({
      include,
      take: Number(limit) || 5, // Limit the number of tickets
    });

    // Map tickets to include total duration
    let ticketsExtended = tickets.map(({ id, ...ticket }) => {
      const totalDuration = ticket.flights.reduce((acc, flight) => acc + (flight.duration || 0), 0);

      // @ts-ignore
      const totalTransfers = ticket.flights[0].transfers.length; // Get the number of transfers -> first flight (all flights have the same number of transfers)

      // Calculate the custom coefficient optimalIdx
      const optimalIdx = (totalDuration / 1000000 + 2 * totalTransfers + 3 * ticket.price).toFixed();

      return {
        id,
        optimalIdx,
        totalTransfers,
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

    /**
     * Filter by transfers
     * @param filter = 'transfers'
     * @param transferCount = ['0', '1', '2', '3'] string[] | 0 or 1 or 2 or 3 (number)
     */
    if (filter === 'transfers' && transferCount) {
      ticketsExtended = ticketsExtended.filter((ticket) => {
        // Multiple transfer options checked
        if (Array.isArray(transferCount)) {
          return transferCount.includes(String(ticket.totalTransfers));
        }
        // Single transfer option checked
        return ticket.totalTransfers === Number(transferCount);
      });
    }

    return { data: ticketsExtended, total: ticketsCount };
  },
  update(id: number, data: Omit<Ticket, 'id'>) {
    return prisma.ticket.update({ where: { id }, data, include });
  },
  remove(id: number) {
    return prisma.ticket.delete({ where: { id } });
  },
};
