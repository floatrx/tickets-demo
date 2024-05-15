import { NextFunction, Request, type RequestHandler, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

/**
 * A type for defining service methods in an Express application.
 * @param P - The type for route parameters.
 * @param ResBody - The type for the response body.
 * @param ReqBody - The type for the request body.
 * @param ReqQuery - The type for the query parameters.
 * @param Locals - The type for any local variables used in the request.
 */
export type ServiceMethods<P = {}, ResBody = unknown, ReqBody = any, ReqQuery = {}> = Record<
  string,
  RequestHandler<P, ResBody | IErrorMessage, ReqBody, ReqQuery>
>;

/**
 * Wrap service methods with expressAsyncHandler to catch async errors
 * @param service
 * @example
 *    const serviceMethods: ServiceMethods = {
 *     async create(req: Request, res: Response) { ... }
 *    };
 *    export const ticketService = safeService(serviceMethods);
 */
export function safeService<T extends ServiceMethods>(service: T): T {
  const wrappedService: Partial<T> = {}; // Use Partial<T> for intermediate object
  for (const key in service) {
    if (service.hasOwnProperty(key)) {
      wrappedService[key] = expressAsyncHandler(service[key]) as T[typeof key];
    }
  }
  return wrappedService as T; // Assert as T when returning
}

/**
 * Error handler (middleware)
 * - safeService decorator wraps all service methods with expressAsyncHandler and passes errors to this middleware
 * @returns status <StatusCode> if internal server error with JSON { message: <ErrorMessage> }
 * @example
 *    app.use(mainErrorHandler);
 */
export const mainErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('[error]', err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
};

/**
 * Syntax error handler middleware
 * @returns status 400 if syntax error with JSON { message: 'error message' } or call next()
 * @example
 *    app.use(syntaxErrorHandler);
 */
export const syntaxErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
};

/**
 * 404 handler (middleware)
 * @example
 *    app.use(notFound);
 */
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: `Error 404! Endpoint [${req.method}] ${req.originalUrl} not found ` });
};
