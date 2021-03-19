import Joi from 'joi'

export const AuthSchema = Joi.object({
  username: Joi.string().required(),
})
