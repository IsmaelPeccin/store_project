import { Request, Response, Router } from 'express';
import SalesController from '../controller/SalesController';

const saleController = new SalesController();

const salesRouter = Router();

salesRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await saleController.list(req, res);
  },
);

salesRouter.get(
  '/:id',
  async (req: Request, res: Response) => {
    await saleController.findById(req, res);
  }
);

export default salesRouter;