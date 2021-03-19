import Joi from 'joi'

export const AuthSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  add1: Joi.string().required(),
  add2: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipcode: Joi.number().required()
})
