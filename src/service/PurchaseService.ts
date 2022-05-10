import { IPurchase } from '../interfaces';
import ProductModel from '../model/ProductModel';
import PurchaseModel from '../model/PurchaseModel';

export default class PurchaseService {
  private productModel: ProductModel;
  
  private purchaseModel: PurchaseModel;

  constructor() {
    this.purchaseModel = new PurchaseModel();
    this.productModel = new ProductModel();
  }

  list = async (): Promise<IPurchase[]> => {
    const allPurchases = await this.purchaseModel.list();
    return allPurchases;
  };

  purchaseById = async (id: number): Promise<IPurchase> => {
    const purchase = await this.purchaseModel.purchaseById(id);
    return purchase;
  }

  create = async (purchaseBody: IPurchase) => {
    const { insertId } = await this.purchaseModel.insertPurchasesDate();
    const { productId, quantity } = purchaseBody;
    const { cost_price } = await this.productModel.findById(productId);
    const total = cost_price * quantity;
  
    await this.purchaseModel.create(insertId, productId, quantity, total);
  
    return {
      purchaseId: insertId,
      itemPurchased: {
        productId,
        quantity,
        price: cost_price,
        total: (cost_price * quantity).toFixed(2),
      },
    };
  };

  delete = async (id: number) => {
    const purchaseIdExists = await this.purchaseModel.purchaseById(id);

  if (!purchaseIdExists) return false;

  await this.purchaseModel.deleteSale(id);

  return true;
  }
}
