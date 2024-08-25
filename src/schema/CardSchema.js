import Joi from "joi";
import Schema from "./Schema";

export default class CardSchema extends Schema {
  static fields = {
    title: { validation: Joi.string().min(2).max(256).required() },
    subtitle: { validation: Joi.string().min(2).max(256).required() },
    description: { validation: Joi.string().min(2).max(1024).required() },
    phone: {
      validation: Joi.string()
        .ruleset.regex(/^0[0-9]{1,2}-?\s?[0-9]{7}$/)
        .rule({ message: 'card "phone" must be a valid phone number' })
        .required()
    },
    email: {
      validation: Joi.string()
        .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'card "mail" must be a valid mail' })
        .required()
    },
    webUrl: {
      label: "web url",
      validation: Joi.string()
        .ruleset.regex(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/)
        .rule({ message: 'card "web" must be a valid url' })
        .allow("")
    },
    imageUrl: {
      label: "image url",
      validation: Joi.string()
        .ruleset.regex(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/)
        .rule({ message: 'card.image "url" must be a valid url' })
        .allow("")
    },
    imageAlt: { label: "image alt", validation: Joi.string().min(2).max(256).allow("") },
    state: { validation: Joi.string().allow("") },
    country: { validation: Joi.string().min(2).max(256).required() },
    city: { validation: Joi.string().min(2).max(256).required() },
    street: { validation: Joi.string().min(2).max(256).required() },
    houseNumber: { label: "house number", validation: Joi.number().required() },
    zip: { validation: Joi.number() },
  };
}