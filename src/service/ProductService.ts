import { IProduct } from '../interfaces';
import ProductModel from '../model/ProductModel';

export default class ProductService {
  private productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  list = async (): Promise<IProduct[]> => {
    const allProducts = await this.productModel.list();
    return allProducts;
  };

  findById = async (id: number): Promise<IProduct> => {
    const product = await this.productModel.findById(id);
    return product;
  }

  create = async (product: IProduct): Promise<IProduct | boolean> => {
    const repeatedProduct = await this.productModel.searchByName(product.name);

  if (repeatedProduct) {
    return true;
  }

    const productCreated = await this.productModel.create(product);
    return productCreated;
  }

  update = async (id: number, product: IProduct) => {
    const productFound = await this.productModel.findById(id);
    if (!productFound) {
     return false
    }

    this.productModel.update(id, product);
 
  }
}