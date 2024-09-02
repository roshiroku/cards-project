import Joi from "joi";
import Schema from "./Schema";

export default class EditUserSchema extends Schema {
  static fields = {
    first: { label: "first name", validation: Joi.string().min(2).max(256).required() },
    middle: { label: "middle name", validation: Joi.string().min(2).max(256).allow("") },
    last: { label: "last name", validation: Joi.string().min(2).max(256).required() },
    phone: {
      validation: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'user "phone" must be a valid phone number' })
        .required()
    },
    url: {
      label: "image url",
      validation: Joi.string()
        .ruleset.regex(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/)
        .rule({ message: "user image must be a valid url" })
        .allow("")
    },
    alt: { label: "image alt", validation: Joi.string().min(2).max(256).allow("") },
    state: { validation: Joi.string().allow("") },
    country: { validation: Joi.string().min(2).max(256).required() },
    city: { validation: Joi.string().min(2).max(256).required() },
    street: { validation: Joi.string().min(2).max(256).required() },
    houseNumber: { label: "house number", validation: Joi.number().required() },
    zip: { validation: Joi.number() },
  };
}