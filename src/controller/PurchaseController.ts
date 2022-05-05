import { Response, Request } from 'express';
import PurchaseService from '../service/PurchaseService';

export default class PurchaseController {
  private purchaseService: PurchaseService;

  constructor() {
    this.purchaseService = new PurchaseService();
  }

  list = async (_req: Request, res: Response) => {
    const allPurchases = await this.purchaseService.list();
    res.status(200).json(allPurchases);
  }

  purchaseById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const purchase = await this.purchaseService.purchaseById(id);
    if (!purchase) {
      res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json(purchase);
  }

  create = async (req: Request, res: Response) => {
    const purchase = req.body;

    const createdPurchase= await this.purchaseService.create(purchase);

    res.status(201).json(createdPurchase);
  }

  delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deleted = await this.purchaseService.delete(id);
    if (!deleted) {
      res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(204).end();
  }
}