import { ISale } from '../interfaces';
import SalesModel from '../model/SalesModel';

export default class ProductService {
  private salesModel: SalesModel;

  constructor() {
    this.salesModel = new SalesModel();
  }

  list = async (): Promise<ISale[]> => {
    const allSales = await this.salesModel.list();
    return allSales;
  };
}
