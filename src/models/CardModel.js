import Model from "./Model";
import CardsAPI from "../services/CardsAPI";
import UserModel from "./UserModel";

export default class CardModel extends Model {
  static api = CardsAPI;
  static cache = {};

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
  }

  fromObject({
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
    this._id = _id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.phone = phone;
    this.email = email;
    this.webUrl = webUrl;
    this.image = { url: imageUrl, alt: imageAlt };
    this.address = { state, country, city, street, houseNumber, zip };

    return this;
  }

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
      bizNumber: this.bizNumber,
      _id: this._id,
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

  async toggleLike(user) {
    const userId = user instanceof UserModel ? user._id : user;

    if (this.isLikedBy(user)) {
      this.likes = this.likes.filter(id => id != userId);
    } else {
      this.likes.push(userId);
    }

    const { likes } = await this.api.toggleLike(this._id);
    this.likes = likes;
  }

  isLikedBy(user) {
    const userId = user instanceof UserModel ? user._id : user;
    return this.likes.includes(userId);
  }

  matches(search) {
    return this.title.includes(search) || this.subtitle.includes(search);
  }
}