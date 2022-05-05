import { Pool, ResultSetHeader } from 'mysql2/promise';
import { ISale } from '../interfaces';
import connection from './connection';

export default class SalesModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  list = async (): Promise<ISale[]> => {
    const query = `SELECT 
    s.id AS saleId,
    sp.product_id AS productId,
    s.date,
    sp.quantity,
    sp.total
    FROM
    Store.sales AS s
    INNER JOIN Store.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id;`;
  
    const result = await this.connection.execute(query);

    const [rows] = result;

    return rows as ISale[];
  };


  saleById = async (id:number):Promise<ISale> => {
    const query = `SELECT 
    s.id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity,
    sp.total
    FROM
    Store.sales AS s
    INNER JOIN Store.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE
    id = ?
    ORDER BY s.id, sp.product_id;`;
    const result = await connection.execute(query, [id]);
    const [rows] = result;
    const [sale] = rows as ISale[];
    return sale;
  };

  insertSalesDate = async () => {
    const query = `INSERT INTO Store.sales (date)
      VALUES (NOW());`;
  
    const result = await connection.execute<ResultSetHeader>(query);;
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { insertId };
  };

  create = async (saleData: ISale) => {
    const query = `INSERT INTO Store.sales_products (sale_id, product_id, quantity, total)
    VALUES (?, ?, ?, ?);`;
    const { id, productId, quantity, total } = saleData;
  
   const [createResult] = await connection.execute<ResultSetHeader>(query, [ id, productId, quantity, total]);
   return createResult;
    
  };

  deleteSale = async (id: number) => {
    const query = 'DELETE FROM Store.sales WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result;
  };
}
