const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(2).required().messages({
    'any.required': '400|"name" is required',
    'string.base': '422| "name" must be a string',
    'string.min': '422|"name" length must be at least 2 characters long',
  }),
  quantity: Joi.number().integer().positive().min(0)
  .strict()
  .required()
  .messages({
    'any.required': '400|"quantity" is required',
    'number.base': '422| "quantity" must be a number',
    'number.positive': '422|"quantity" must be greater than or equal to 1',
  }),
  cost_price: Joi.number().positive().min(0)
  .strict()
  .required()
  .messages({
    'any.required': '400|"cost_price" is required',
    'number.base': '422| "cost_price" must be a number',
    'number.precision': '422|"cost_price" must have 2 decimals',
  }),
  sale_price: Joi.number().positive().min(0)
  .strict()
  .required()
  .messages({
    'any.required': '400|"sale_price" is required',
    'number.base': '422| "sale_price" must be a number',
    'number.precision': '422|"sale_price" must have 2 decimals',
  })
});