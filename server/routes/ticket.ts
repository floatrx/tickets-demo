import { ticketService } from '@/services/ticket';
import type { Request, Response } from 'express';
import { Router } from 'express';

export const ticketRouter = Router()
  // Test endpoint
  .get(`/test`, (_: Request, res: Response) => {
    res.json({ message: `👋 API running` });
  })
  // Create a new ticket
  .post(`/tickets`, ticketService.create)
  // Get list of tickets
  .get('/tickets', ticketService.search);
