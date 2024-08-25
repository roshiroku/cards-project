import Joi from "joi";
import Schema from "./Schema";

export default class RegisterSchema extends Schema {
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
    email: {
      type: "email",
      validation: Joi.string()
        .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'user "mail" must be a valid mail' })
        .required()
    },
    password: {
      type: "password",
      validation: Joi.string()
        .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
        .rule({ message: 'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-' })
        .required()
    },
    url: {
      label: "image url",
      validation: Joi.string()
        .ruleset.regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
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
    isBusiness: { label: "signup as business", validation: Joi.boolean().required() },
  };
}