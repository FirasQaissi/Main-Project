import Joi from "joi";

export const cardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
     phone: Joi.string()
          .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
  
          .rule({ message: 'user "phone" must be a valid phone number' })
          .required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    web: Joi.string().uri().allow("").optional(),

    image: Joi.object({
        url: Joi.string()
            .uri()
            .required()
            .messages({ "string.uri": "Image must be a valid URL" }),
        alt: Joi.string().min(2).max(256).required(),
    }),

    address: Joi.object({
        state: Joi.string().allow(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().required(),
    }),
});