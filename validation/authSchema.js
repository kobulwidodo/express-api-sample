const Joi = require('@hapi/joi')

const registerSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
})

module.exports = {
  registerSchema
}
