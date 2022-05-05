import { Request, Response, Router } from 'express';
import PurchaseController from '../controller/PurchaseController'
import SalesValidate from '../middlewares/salesValidate';

const purchaseController = new PurchaseController();

const purchaseRouter = Router();

purchaseRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await purchaseController.list(req, res);
  },
);

purchaseRouter.get(
  '/:id',
  async (req: Request, res: Response) => {
    await purchaseController.purchaseById(req, res);
  }
);

purchaseRouter.post(
  '/',
  SalesValidate.validate,
  async (req: Request, res: Response) => {
    await purchaseController.create(req, res);
  }
);

purchaseRouter.delete(
  '/:id',
  async (req: Request, res: Response) => {
    await purchaseController.delete(req, res);
  }
);

export default purchaseRouter;