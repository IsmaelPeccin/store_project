import { Request, Response, Router } from 'express';
import ProductController from '../controller/ProductController';
import CreateValidate from '../middlewares/productValidate';

const productController = new ProductController();

const productRouter = Router();

productRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await productController.list(req, res);
  },
);

productRouter.get(
  '/:id',
  async (req: Request, res: Response) => {
    await productController.findById(req, res);
  }
);

productRouter.post(
  '/',
  CreateValidate.validate,
  async (req: Request, res: Response) => {
    await productController.create(req, res);
  }
);

export default productRouter;
