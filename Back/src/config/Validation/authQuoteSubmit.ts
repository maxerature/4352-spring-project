import Joi from 'joi'

export const AuthSchema = Joi.object({
    username: Joi.required(),
    deliveryDate: Joi.string().required(),
    galsRequested: Joi.number().required(),
    pricePerGal: Joi.number().required(),
    cost: Joi.number().required()
});