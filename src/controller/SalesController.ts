import { Response, Request } from 'express';
import SalesService from '../service/SalesService';

export default class SalesController {
  private salesService: SalesService;

  constructor() {
    this.salesService = new SalesService();
  }

  list = async (_req: Request, res: Response) => {
    const allSales = await this.salesService.list();
    res.status(200).json(allSales);
  }

  saleById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const sale = await this.salesService.saleById(id);
    if (!sale) {
      res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  }

  create = async (req: Request, res: Response) => {
    const sale = req.body;

    const createdSale= await this.salesService.create(sale);

    res.status(201).json(createdSale);
  }
}