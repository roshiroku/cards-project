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
    address = { state: "", country: "", city: "", street: "", houseNumber: null, zip: null },
    bizNumber = null,
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

  async delete() {
    const user = UserModel.cache[this.user_id];

    await super.delete();

    if (user?.cards) {
      user.cards = user.cards.filter(({ _id }) => _id != this._id);
    }
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
    houseNumber = null,
    zip = null,
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
    const index = this.likes.indexOf(userId);

    if (index > -1) {
      this.likes.splice(index, 1);
    } else {
      this.likes.push(userId);
    }

    try {
      const { likes } = await this.api.toggleLike(this._id);
      this.likes = likes;
    } catch (e) {
      if (index > -1) {
        this.likes.splice(index, 0, userId);
      } else {
        this.likes.pop();
      }

      throw e;
    }
  }

  isLikedBy(user) {
    const userId = user instanceof UserModel ? user._id : user;
    return this.likes.includes(userId);
  }

  matches(search) {
    search = search.toLowerCase();
    return this.title.toLowerCase().includes(search) || this.subtitle.toLowerCase().includes(search);
  }
}