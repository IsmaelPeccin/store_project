import { Response, Request } from 'express';
import SalesModel from '../model/SalesModel';

export default class SalesController {
  private salesModel: SalesModel;

  constructor() {
    this.salesModel = new SalesModel();
  }

  list = async (req: Request, res: Response) => {
    const allSales = await this.salesModel.list();
    res.status(200).json(allSales);
  }

  findById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const sale = await this.salesModel.findById(id);
    if (!sale) {
      res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  }
}