import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import jokeRoutes from './routes/joke.routes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
 
const __dirname = dirname(fileURLToPath(import.meta.url));
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.use(express.static(join(__dirname, '../public')));
 
// Routes
app.use("/api", jokeRoutes);

// ── Error middlewares (must be last) ──────────────────────────
app.use(notFound);
app.use(errorHandler);
 
export default app;
 