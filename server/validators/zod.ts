import type { Response } from 'express';
import type { ZodIssue } from 'zod';

/**
 * Throw validation error with Zod issues
 * @param res - express response object
 * @param e - Zod error object
 */
export const throwValidationError = (res: Response, e: { issues?: ZodIssue[]; message?: string }): string => {
  let message = e.message || 'Validation error'; // get message from Error object or default
  // If issues array exists, map each issue to a string and join them
  if (e.issues) {
    message = e.issues.map((issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
  }
  res.status(400);
  throw new Error(message);
};
