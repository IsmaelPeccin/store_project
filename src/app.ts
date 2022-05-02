import express from 'express';
import { errorMiddleware } from './middlewares';
import { productRouter } from './routes';

const app = express();

app.use(express.json());
app.use('/products', productRouter);

app.use(errorMiddleware);

export default app;
