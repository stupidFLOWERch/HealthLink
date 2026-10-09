import express from 'express';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes';
import consultationRoutes from './routes/consultationRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'HealthLink API is running' });
});

app.use('/doctors', doctorRoutes);
app.use('/consultations', consultationRoutes);

export default app;