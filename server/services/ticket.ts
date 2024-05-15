import { safeService } from '@/middleware/errors';
import { ticketRepository } from '@/repositories/ticket';
import { ticketCreateSchema, ticketSearchSchema } from '@/validators/ticket';
import { throwValidationError } from '@/validators/zod';
import type { ITicketCreateResponse, ITicketFilters, ITicketSearchResponse, TicketCreateBody } from '@/types/ticket';
import type { Request, Response } from 'express';

/**
 * Ticket CRUD service methods
 */
const serviceMethods = {
  async create(req: Request<{}, never, TicketCreateBody>, res: Response<ITicketCreateResponse>) {
    try {
      ticketCreateSchema.parse(req.body);
    } catch (e) {
      throwValidationError(res, e);
    }

    const flightNumbers = req.body.flights.map((flight) => flight.number);
    const existingTickets = await ticketRepository.getFlightsByNumbers(flightNumbers);

    if (existingTickets.length) {
      res.status(400);
      throw new Error(`One or more flights (${flightNumbers.join(',')}) are already used in another ticket`);
    }

    const ticket = await ticketRepository.create(req.body);
    res.json(ticket);
  },
  async search(req: Request<{}, any, any, ITicketFilters>, res: Response<ITicketSearchResponse>) {
    try {
      ticketSearchSchema.parse(req.query);
    } catch (e) {
      throwValidationError(res, e);
    }
    const tickets = await ticketRepository.search(req.query);
    res.json(tickets);
  },
};

export const ticketService = safeService(serviceMethods);
