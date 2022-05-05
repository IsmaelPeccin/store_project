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
    await saleController.saleById(req, res);
  }
);

salesRouter.post(
  '/',
  async (req: Request, res: Response) => {
    await saleController.create(req, res);
  }
);

export default salesRouter;