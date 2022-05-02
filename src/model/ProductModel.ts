import { Pool } from 'mysql2/promise';
import { IListAllProducts } from '../interfaces';
import connection from './connection';

export default class ProductModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  list = async (): Promise<IListAllProducts[]> => {
    const query = 'SELECT * FROM Store.products;';
  
    const result = await this.connection.execute(query);

    const [rows] = result;

    return rows as IListAllProducts[];
  };
}