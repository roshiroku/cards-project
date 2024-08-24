import Joi from "joi";
import Model from "./Model";
import CardsAPI from "../services/CardsAPI";

const urlRegex = /^(https?:\/\/.+)$|(^.*\.(png|jpg|jpeg|gif|webp|svg))$/i;

export default class CardModel extends Model {
  static api = CardsAPI;

  static schema = {
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
      .ruleset.regex(/^0[0-9]{1,2}-?\s?[0-9]{7}$/)
      .rule({ message: 'card "phone" mast be a valid phone number' })
      .required(),
    email: Joi.string()
      .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .rule({ message: 'card "mail" mast be a valid mail' })
      .required(),
    webUrl: Joi.string()
      .ruleset.regex(urlRegex)
      .rule({ message: 'card "web" mast be a valid url' })
      .allow(""),
    imageUrl: Joi.string()
      .ruleset.regex(urlRegex)
      .rule({ message: 'card.image "url" mast be a valid url' })
      .allow(""),
    imageAlt: Joi.string().min(2).max(256).allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number(),
  };

  static labels = {
    webUrl: "web url",
    imageUrl: "image url",
    imageAlt: "image alt",
    houseNumber: "house humber",
  };

  static fromObject({
    _id = "",
    title = "",
    subtitle = "",
    description = "",
    phone = "",
    email = "",
    webUrl = "",
    imageUrl = "",
    imageAlt = "",
    state = "",
    country = "",
    city = "",
    street = "",
    houseNumber = 0,
    zip = 0,
  }) {
    return new CardModel({
      _id,
      title,
      subtitle,
      description,
      phone,
      email,
      webUrl,
      image: { url: imageUrl, alt: imageAlt },
      address: { state, country, city, street, houseNumber, zip }
    });
  };

  get fullAddress() {
    const { street, houseNumber, city, state, country, zip } = this.address;
    return `${street}  ${houseNumber}, ${city}, ${state} ${country}, ${zip}`;
  }

  constructor({
    _id = "",
    title = "",
    subtitle = "",
    description = "",
    phone = "",
    email = "",
    web = "",
    image = { url: "", alt: "" },
    address = { state: "", country: "", city: "", street: "", houseNumber: 0, zip: 0 },
    bizNumber = 0,
    likes = [],
    user_id = "",
    createdAt = ""
  } = {}) {
    super({ _id, createdAt });
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.phone = phone;
    this.email = email;
    this.web = web;
    this.image = image;
    this.address = address;
    this.bizNumber = bizNumber;
    this.likes = likes;
    this.user_id = user_id;
  };

  toObject() {
    return {
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      phone: this.phone,
      email: this.email,
      webUrl: this.web,
      imageUrl: this.image.url,
      imageAlt: this.image.alt,
      ...this.address,
    };
  }

  serialize() {
    return {
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      phone: this.phone,
      email: this.email,
      web: this.web,
      image: this.image,
      address: this.address
    };
  }
}