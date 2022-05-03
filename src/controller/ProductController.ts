import { Request, Response } from 'express';
import ProductService from '../service/ProductService';

export default class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  list = async (_req: Request, res: Response) => {
    const allProducts = await this.productService.list();
    return res.status(200).json(allProducts);
  }

  findById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const product = await this.productService.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  }

  create = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.create(product);
    if (productCreated === true) {
      return res.status(400).json({ message: 'Product already exists' });
    }
    res.status(201).json(productCreated);
  };
} 