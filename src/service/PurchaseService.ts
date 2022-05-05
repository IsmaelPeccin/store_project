import { ISale } from '../interfaces';
import ProductModel from '../model/ProductModel';
import PurchaseModel from '../model/PurchaseModel';

export default class PurchaseService {
  private productModel: ProductModel;
  
  private purchaseModel: PurchaseModel;

  constructor() {
    this.purchaseModel = new PurchaseModel();
    this.productModel = new ProductModel();
  }

  list = async (): Promise<ISale[]> => {
    const allPurchases = await this.purchaseModel.list();
    return allPurchases;
  };

  purchaseById = async (id: number): Promise<ISale> => {
    const purchase = await this.purchaseModel.purchaseById(id);
    return purchase;
  }

  create = async (purchases: ISale) => {
    const { insertId } = await this.purchaseModel.insertPurchasesDate();
    const product = await this.productModel.findById(purchases.productId);
    const totalPrice = ((purchases.quantity) * (product.cost_price)).toFixed(2);


    return {
      Id: insertId,
      productId: purchases.productId,
      quantity: purchases.quantity,
      total: totalPrice,
    }
  }

  delete = async (id: number) => {
    const purchaseIdExists = await this.purchaseModel.purchaseById(id);

  if (!purchaseIdExists) return false;

  await this.purchaseModel.deleteSale(id);

  return true;
  }
}
