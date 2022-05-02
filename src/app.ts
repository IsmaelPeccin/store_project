import express from 'express';
import { errorMiddleware } from './middlewares';

const app = express();

app.use(express.json());

app.use(errorMiddleware);

export default app;