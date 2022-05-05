import { Request, Response, Router } from 'express';
import SalesController from '../controller/SalesController';
import SalesValidate from '../middlewares/salesValidate';

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
  SalesValidate.validate,
  async (req: Request, res: Response) => {
    await saleController.create(req, res);
  }
);

salesRouter.delete(
  '/:id',
  async (req: Request, res: Response) => {
    await saleController.delete(req, res);
  }
);

export default salesRouter;