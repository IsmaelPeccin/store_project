import { Pool } from 'mysql2/promise';
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
    s.date,
    sp.product_id AS productId,
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


  findById = async (id:number):Promise<ISale> => {
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
    const [product] = rows as ISale[];
    return product;
  };
}
//   create = async (product: ISale): Promise<ISale> => {
//     const { name, quantity, cost_price, sale_price  } = product;
//     const query = 'INSERT INTO Store.products (name, quantity, cost_price, sale_price) VALUES (?, ?, ?, ?)';
//     const result = await this.connection.execute<ResultSetHeader>(
//       query,
//       [name, quantity, cost_price, sale_price],
//     );
//     const [dataInserted] = result;
//     const { insertId } = dataInserted;
//     return { sale_id: insertId, ...product };
//   }

//   searchByName = async (name: string): Promise<IProduct> => {
//     const query = 'SELECT * FROM Store.products WHERE name = ?';
//     const result = await this.connection.execute(query, [name]);
//     const [rows] = result;
//     const [product] = rows as IProduct[];
//     return product;
//   }

//   update = async (id: number, product: IProduct) => {
//     const { name, quantity, sale_price, cost_price,  } = product;
//     const query = 'UPDATE Store.products SET name = ?, quantity = ?, sale_price = ?, cost_price = ? WHERE id = ?';
//     await this.connection.execute(
//       query,
//       [name, quantity, sale_price, cost_price, id]
//     );
//   }

//   remove = async (id: number) => {
//     const query = 'DELETE FROM Store.products WHERE id = ?';
//     await this.connection.execute(
//     query,
//       [id],
//     );
//   }
// }