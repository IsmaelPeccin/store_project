import express from 'express';
require('express-async-errors');
import { errorMiddleware } from './middlewares';
import { productRouter, purchaseRouter, salesRouter } from './routes';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/sales', salesRouter);
app.use ('/purchases', purchaseRouter);

app.use(errorMiddleware);

export default app;
