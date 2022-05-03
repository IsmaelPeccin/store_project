import { Request, Response, NextFunction } from 'express';
const productValidate = require('../schemas/product');

export default class CreateValidate {

  static async validate(req: Request, res: Response, next: NextFunction) {
    const { error } = productValidate.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    return next();
  }
}

