import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IPurchase } from '../interfaces';
import connection from './connection';

export default class PurchaseModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  list = async (): Promise<IPurchase[]> => {
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

    return rows as IPurchase[];
  };


  purchaseById = async (id:number):Promise<IPurchase> => {
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
    const [sale] = rows as IPurchase[];
    return sale;
  };

  insertPurchasesDate = async () => {
    const query = `INSERT INTO Store.purchases (date)
      VALUES (NOW());`;
  
    const result = await connection.execute<ResultSetHeader>(query);;
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { insertId };
  };

  create = async (id: number, productId: number, quantity:number, total:number) => {
    const query = `INSERT INTO Store.purchases_products (purchase_id, product_id, quantity, total)
    VALUES (?, ?, ?, ?);`;
   
   const [createResult] = await connection.execute<ResultSetHeader>(query, [ id, productId, quantity, total]);
   return createResult;
    
  };

  deleteSale = async (id: number) => {
    const query = 'DELETE FROM Store.purchases WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result;
  };
}
