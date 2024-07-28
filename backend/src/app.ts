// Libraries
import express from 'express';

// Routes
import marketCapRoutes from './routes/marketCapRoutes';
import tpsRoutes from './routes/tpsRoutes';
import walletBalanceRoutes from './routes/walletBalanceRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', marketCapRoutes);
app.use('/', tpsRoutes);
app.use('/', walletBalanceRoutes);

export default app;
