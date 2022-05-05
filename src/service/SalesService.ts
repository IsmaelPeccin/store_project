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
  }

  create = async (sales: ISale) => {
    const { insertId } = await this.salesModel.insertSalesDate();
    const product = await this.productModel.findById(sales.productId);
    const totalPrice = ((sales.quantity) * (product.sale_price)).toFixed(2);


    return {
      saleId: insertId,
      productId: sales.productId,
      quantity: sales.quantity,
      total: totalPrice,
    }
  }
}
