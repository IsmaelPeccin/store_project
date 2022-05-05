import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces';
import connection from './connection';

export default class ProductModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  list = async (): Promise<IProduct[]> => {
    const query = 'SELECT * FROM Store.products;';
  
    const result = await this.connection.execute(query);

    const [rows] = result;

    return rows as IProduct[];
  };

  findById = async (id:number):Promise<IProduct> => {
    const query = 'SELECT * FROM Store.products WHERE id = ?';
    const result = await connection.execute(query, [id]);
    const [rows] = result;
    const [product] = rows as IProduct[];
    return product;
  };

  create = async (product: IProduct): Promise<IProduct> => {
    const { name, quantity, cost_price, sale_price  } = product;
    const query = 'INSERT INTO Store.products (name, quantity, cost_price, sale_price) VALUES (?, ?, ?, ?)';
    const result = await this.connection.execute<ResultSetHeader>(
      query,
      [name, quantity, cost_price, sale_price],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  searchByName = async (name: string): Promise<IProduct> => {
    const query = 'SELECT * FROM Store.products WHERE name = ?';
    const result = await this.connection.execute(query, [name]);
    const [rows] = result;
    const [product] = rows as IProduct[];
    return product;
  }

  update = async (id: number, product: IProduct) => {
    const { name, quantity, sale_price, cost_price,  } = product;
    const query = 'UPDATE Store.products SET name = ?, quantity = ?, sale_price = ?, cost_price = ? WHERE id = ?';
    await this.connection.execute(
      query,
      [name, quantity, sale_price, cost_price, id]
    );
  }

  remove = async (id: number) => {
    const query = 'DELETE FROM Store.products WHERE id = ?';
    await this.connection.execute(
    query,
      [id],
    );
  }
}