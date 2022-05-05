import { Pool, ResultSetHeader } from 'mysql2/promise';
import { ISale } from '../interfaces';
import connection from './connection';

export default class PurchaseModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  list = async (): Promise<ISale[]> => {
    const query = `SELECT 
    p.id AS purchaseId,
    pp.product_id AS productId,
    p.date,
    pp.quantity,
    pp.total
    FROM
    Store.purchases AS p
    INNER JOIN Store.purchases_products AS pp
    ON p.id = pp.purchase_id
    ORDER BY p.id, pp.product_id;`;
  
    const result = await this.connection.execute(query);

    const [rows] = result;

    return rows as ISale[];
  };


  purchaseById = async (id:number):Promise<ISale> => {
    const query = `SELECT 
    p.id AS purchaseId,
    pp.product_id AS productId,
    p.date,
    pp.quantity,
    pp.total
    FROM
    Store.purchases AS p
    INNER JOIN Store.purchases_products AS pp
    ON p.id = pp.purchase_id
    WHERE
    id = ?
    ORDER BY p.id, pp.product_id;`;

    const result = await connection.execute(query, [id]);
    const [rows] = result;
    const [sale] = rows as ISale[];
    return sale;
  };

  insertPurchasesDate = async () => {
    const query = `INSERT INTO Store.sales (date)
      VALUES (NOW());`;
  
    const result = await connection.execute<ResultSetHeader>(query);;
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { insertId };
  };

  create = async (purchaseData: ISale) => {
    const query = `INSERT INTO Store.sales_products (purchase_id, product_id, quantity, total)
    VALUES (?, ?, ?, ?);`;
    const { id, productId, quantity, total } = purchaseData;
  
   const [createResult] = await connection.execute<ResultSetHeader>(query, [ id, productId, quantity, total]);
   return createResult;
    
  };

  deleteSale = async (id: number) => {
    const query = 'DELETE FROM Store.sales WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result;
  };
}
