const salesValidate = require('../schemas/sales');
import { Request, Response, NextFunction } from 'express';

export default class SalesValidate {

  static async validate(req: Request, res: Response, next: NextFunction) {
    const { error } = salesValidate.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    return next();
  }
}
