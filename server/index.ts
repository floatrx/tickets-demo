/**
 * Simple Express server with CORS
 * enabled and JSON request body parsing.
 *
 * Use Prisma for database access.
 * Database type: SQLite
 */
import { PORT } from '@/config/const';
import cors from 'cors';
import express from 'express';
import { ticketRouter } from '@/routes/ticketRouter';

const app = express();

app.use(cors()); // enable CORS
app.use(express.json()); // enable JSON request body parsing
app.use('/api', ticketRouter); // main router

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}/api/test`);
});
