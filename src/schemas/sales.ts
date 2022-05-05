const joi = require('joi');

const salesJoi = joi.object({
  productId: joi.required().messages({
    'any.required': '400|"productId" is required',
  }),
  quantity: joi.number().positive().required().min(0)
  .messages({
    'any.required': '400|"quantity" is required',
    'number.base': '422| "quantity" must be a number',
    'number.positive': '422|"quantity" must be greater than or equal to 1',
  }),
});

module.exports = joi.array().items(salesJoi);
