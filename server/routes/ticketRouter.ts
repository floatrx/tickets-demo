import { Router } from 'express';
import { ticketRepo } from '@/repos/ticketRepo';

import type { ITicketFilters, TicketCreateBody } from '@/types';
import type { Ticket } from '@prisma/client';
import type { Request, Response } from 'express';

export const ticketRouter = Router()
  .get(`/test`, (_: Request, res: Response) => {
    res.json({ message: `👋 API running` });
  })
  // Create a new ticket
  .post(`/tickets`, async (req: Request<never, never, TicketCreateBody>, res: Response<Ticket | IErrorMessage>) => {
    try {
      const ticket = await ticketRepo.create(req.body);
      res.json(ticket);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  })
  // Get list of tickets
  .get('/tickets', async (req: Request<never, never, never, ITicketFilters>, res: Response) => {
    try {
      const tickets = await ticketRepo.list(req.query);
      res.json(tickets);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
