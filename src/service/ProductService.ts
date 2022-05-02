import { IListAllProducts } from '../interfaces';
import ProductModel from '../model/ProductModel';

export default class ProductService {
  private productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  list = async (): Promise<IListAllProducts[]> => {
    const allProducts = await this.productModel.list();
    return allProducts;
  };
}