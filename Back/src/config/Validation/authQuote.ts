import Joi from 'joi'

export const AuthSchema = Joi.object({
    galsRequested: Joi.number().required(),
    deliveryDate: Joi.string().required(),
    pricePerGal: Joi.number().required()
});