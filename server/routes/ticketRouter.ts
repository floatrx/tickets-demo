import { Router } from 'express';
import { ticketRepo } from '@/repos/ticketRepo';

import type { TicketCreateBody } from '@/types';
import type { Ticket } from '@prisma/client';
import type { Request, Response } from 'express';

export const ticketRouter = Router()
  .get(`/test`, (_: Request, res: Response) => {
    res.json({ message: `👋 API running` });
  })
  .post(`/tickets`, async (req: Request<never, never, TicketCreateBody>, res: Response<Ticket>) => {
    const ticket = await ticketRepo.create(req.body);
    res.json(ticket);
  })
  .get('/tickets', async (_: Request, res: Response) => {
    const tickets = await ticketRepo.list();
    res.json(tickets);
  })
  .get(`/tickets/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await ticketRepo.get(Number(id));
    res.json(ticket);
  });
