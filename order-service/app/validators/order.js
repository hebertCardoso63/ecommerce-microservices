const Joi = require('joi');

const orderSchema = Joi.object({
    customer_id: Joi.string().required(),
    products: Joi.array().items(
      Joi.object({
        product_id: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().precision(2).required()
      })
    ).required()
  });

  exports.orderSchema = orderSchema;