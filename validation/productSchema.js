const Joi = require('@hapi/joi')

const createProduct = Joi.object({
  title: Joi.string()
    .required(),
  price: Joi.number()
    .required(),
  description: Joi.string()
    .required(),
  published: Joi.boolean(),
  userId: Joi.number()
    .required()
})

const updateProduct = Joi.object({
  title: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
  published: Joi.boolean()
})

module.exports = {
  createProduct,
  updateProduct
}
