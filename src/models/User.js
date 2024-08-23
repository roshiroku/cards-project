import Joi from "joi";
import Model from "./Model";

export default class User extends Model {
  static schema = {
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({ message: 'user "phone" must be a valid phone number' })
      .required(),
    email: Joi.string()
      .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .rule({ message: 'user "mail" must be a valid mail' })
      .required(),
    password: Joi.string()
      .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
      .rule({
        message: 'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
      })
      .required(),
    url: Joi.string()
      .ruleset.regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
      .rule({ message: "user image must be a valid url" })
      .allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number(),
    isBusiness: Joi.boolean().required(),
  };

  static labels = {
    first: "first name",
    middle: "middle name",
    last: "last name",
    url: "image url",
    alt: "image alt",
    houseNumber: "house number",
    isBusiness: "signup as business"
  };

  static fromForm({
    first = "",
    middle = "",
    last = "",
    phone = "",
    email = "",
    password = "",
    url = "",
    alt = "",
    state = "",
    country = "",
    city = "",
    street = "",
    houseNumber = 0,
    zip = 0,
    isBusiness = false
  }) {
    return new User({
      name: { first, middle, last },
      phone,
      email,
      password,
      image: { url, alt },
      address: { state, country, city, street, houseNumber, zip },
      isBusiness
    });
  }

  constructor({
    name = { first: "", middle: "", last: "" },
    phone = "",
    email = "",
    password = "",
    image = { url: "", alt: "" },
    address = { state: "", country: "", city: "", street: "", houseNumber: 0, zip: 0 },
    isBusiness = false
  } = {}) {
    super();
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.image = image;
    this.address = address;
    this.isBusiness = isBusiness;
  }

  toForm() {
    return {
      ...this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
      ...this.image,
      ...this.address,
      isBusiness: this.isBusiness
    };
  }
}