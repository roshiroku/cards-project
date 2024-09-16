import Joi from "joi";
import Schema from "./Schema";
import EditUserSchema from "./EditUserSchema";

export default class RegisterSchema extends Schema {
  static fields = {
    first: EditUserSchema.fields.first,
    middle: EditUserSchema.fields.middle,
    last: EditUserSchema.fields.last,
    phone: EditUserSchema.fields.phone,
    email: {
      type: "email",
      validation: Joi.string()
        .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'user "email" must be a valid email' })
        .required()
    },
    password: {
      type: "password",
      validation: Joi.string()
        .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
        .rule({ message: 'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-' })
        .required()
    },
    url: EditUserSchema.fields.url,
    alt: EditUserSchema.fields.alt,
    state: EditUserSchema.fields.state,
    country: EditUserSchema.fields.country,
    city: EditUserSchema.fields.city,
    street: EditUserSchema.fields.street,
    houseNumber: EditUserSchema.fields.houseNumber,
    zip: EditUserSchema.fields.zip,
    isBusiness: { label: "signup as business", validation: Joi.boolean().required() },
  };
}