import { Request, Response, Router } from 'express';
import ProductController from '../controller/ProductController';

const productController = new ProductController();

const productRouter = Router();

productRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await productController.list(req, res);
  },
);

export default productRouter; 