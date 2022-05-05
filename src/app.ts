import express from 'express';
require('express-async-errors');
import { errorMiddleware } from './middlewares';
import { productRouter } from './routes';

const app = express();

app.use(express.json());
app.use('/products', productRouter);

app.use(errorMiddleware);

export default app;
