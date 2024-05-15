import { prisma } from '@/lib/prisma';
import { transformFlights } from '@/lib/transform';
import { Prisma } from '@prisma/client';

import TicketOrderByWithRelationInput = Prisma.TicketOrderByWithRelationInput;
import type { ITicketFilters, ITicketSort, TicketCreateBody } from '@/types/ticket';
import type { Ticket } from '@prisma/client';

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
export const ticketRepository = {
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

    /**
     * Sort by price, duration, or optimal index
     * @param sort = 'price' (default) | 'duration' | 'optimal'
     */
    const order: Record<ITicketSort, TicketOrderByWithRelationInput> = {
      price: { price: 'asc' },
      duration: { totalDuration: 'asc' },
      optimal: { optimalIndex: 'asc' },
    };

    // Get the total number of tickets based on the filter
    const ticketsCount = await prisma.ticket.count({ where }); // Get the total number of tickets

    // Query tickets
    const tickets = await prisma.ticket.findMany({
      include,
      where,
      orderBy: order[sort || 'price'],
      take: Number(limit) || 5, // Limit the number of tickets
    });

    return { data: tickets, total: ticketsTotal, count: ticketsCount };
  },
  update(id: number, data: Omit<Ticket, 'id'>) {
    return prisma.ticket.update({ where: { id }, data, include });
  },
  remove(id: number) {
    return prisma.ticket.delete({ where: { id } });
  },
};
