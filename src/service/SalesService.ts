import { ISale } from '../interfaces';
import ProductModel from '../model/ProductModel';
import SalesModel from '../model/SalesModel';

export default class ProductService {
  private salesModel: SalesModel;
  
  private productModel: ProductModel;

  constructor() {
    this.salesModel = new SalesModel();
    this.productModel = new ProductModel();
  }

  list = async (): Promise<ISale[]> => {
    const allSales = await this.salesModel.list();
    return allSales;
  };

  saleById = async (id: number): Promise<ISale> => {
    const sale = await this.salesModel.saleById(id);
    return sale;
  };

  create = async (salesBody: ISale) => {
    const { insertId } = await this.salesModel.insertSalesDate();
    const { productId, quantity } = salesBody;
    const { sale_price } = await this.productModel.findById(productId);
  
    await this.salesModel.create(insertId, productId, quantity);
  
    return {
      id: insertId,
      itemSold: {
        productId,
        quantity,
        price: sale_price,
        total: (sale_price * quantity).toFixed(2),
      },
    };
  };

  delete = async (id: number) => {
    const saleIdExists = await this.salesModel.saleById(id);

  if (!saleIdExists) return false;

  await this.salesModel.deleteSale(id);

  return true;
  }
}
