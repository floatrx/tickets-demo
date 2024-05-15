/**
 * Simple Express server with CORS
 * enabled and JSON request body parsing.
 *
 * Use Prisma for database access.
 * Database type: SQLite
 */
import express from 'express';
import cors from 'cors';
import { PORT } from '@/config/const';
import { mainErrorHandler, notFound, syntaxErrorHandler } from '@/middleware/errors';
import { ticketRouter } from '@/routes/ticket';

const app = express();

app.use(cors()); // enable CORS
app.use(express.json()); // enable JSON request body parsing
app.use('/api', ticketRouter); // main router

// Error Handling middlewares
app.use(mainErrorHandler);
app.use(syntaxErrorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}/api/test`);
});
