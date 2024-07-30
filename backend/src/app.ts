// Libraries
import express from 'express';
import cors from 'cors';

// Routes
import marketCapRoutes from './routes/marketCapRoutes';
import tpsRoutes from './routes/tpsRoutes';
import walletBalanceRoutes from './routes/walletBalanceRoutes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only the frontend origin
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', marketCapRoutes);
app.use('/', tpsRoutes);
app.use('/', walletBalanceRoutes);

export default app;
