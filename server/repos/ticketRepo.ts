import { prisma } from '@/lib/prisma';
import { transformFlights } from '@/lib/transform';
import type { TicketCreateBody } from '@/types';
import type { Prisma, Ticket } from '@prisma/client';

// Include related data in the response
const include: Prisma.TicketInclude = {
  airline: true, // Include the airline data
  flights: {
    orderBy: {
      directionId: 'asc', // Outbound first
    },
    include: {
      direction: true, // Include the direction data
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
  get(id: number) {
    return prisma.ticket.findUnique({ where: { id }, include });
  },
  list() {
    return prisma.ticket.findMany({ include, orderBy: { id: 'desc' } });
  },
  update(id: number, data: Omit<Ticket, 'id'>) {
    return prisma.ticket.update({ where: { id }, data, include });
  },
  remove(id: number) {
    return prisma.ticket.delete({ where: { id } });
  },
};
