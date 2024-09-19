import Model from "./Model";
import UsersAPI from "../services/UsersAPI";
import CardsAPI from "../services/CardsAPI";
import CardModel from "./CardModel";
import { capitalize } from "../utils/string";

export default class UserModel extends Model {
  static api = UsersAPI;
  static cache = {};

  cards;

  get shortName() {
    return capitalize(`${this.name.first} ${this.name.last}`);
  }

  get fullName() {
    return capitalize(Object.values(this.name).filter(word => word).join(" "));
  }

  constructor({
    _id = "",
    name = { first: "", middle: "", last: "" },
    phone = "",
    email = "",
    password = "",
    image = { url: "", alt: "" },
    address = { state: "", country: "", city: "", street: "", houseNumber: null, zip: null },
    isAdmin = false,
    isBusiness = false,
    createdAt = ""
  } = {}) {
    super({ _id, createdAt });
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.image = image;
    this.address = address;
    this.isAdmin = isAdmin;
    this.isBusiness = isBusiness;
  }

  async delete() {
    const { cache: cardsCache } = CardModel;
    const cards = [];

    await super.delete();

    Object.keys(cardsCache).forEach(id => {
      const card = cardsCache[id];

      if (card instanceof CardModel) {
        if (card.user_id == this._id) {
          cards.push(card);
          delete cardsCache[id];
        } else if (card.isLikedBy(this)) {
          card.likes = card.likes.filter(id => id != this._id);
        }
      }
    });

    cardsCache.all = cardsCache.all?.filter(card => !cards.includes(card));
  }

  fromObject({
    _id = "",
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
    houseNumber = null,
    zip = null,
    isBusiness = false
  }) {
    this._id = _id;
    this.name = { first, middle, last };
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.image = { url, alt };
    this.address = { state, country, city, street, houseNumber, zip };
    this.isBusiness = isBusiness;

    return this;
  }

  toObject() {
    return {
      ...this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
      ...this.image,
      ...this.address,
      isBusiness: this.isBusiness,
      _id: this._id,
    };
  }

  serialize() {
    const data = {
      name: this.name,
      phone: this.phone,
      image: this.image,
      address: this.address
    };

    if (!this._id) {
      data.email = this.email;
      data.password = this.password;
      data.isBusiness = this.isBusiness;
    }

    return data;
  }

  async myCards() {
    if (!this.cards) {
      const data = await CardsAPI.myCards();
      this.cards = data.map(card => CardModel.loadFromData(card));
    }

    return this.cards;
  }

  async toggleBusinessStatus(isBusiness = undefined) {
    if (this.isBusiness == isBusiness) return;

    this.isBusiness = !this.isBusiness;

    try {
      const { isBusiness } = await UsersAPI.toggleBusinessStatus(this._id);
      this.isBusiness = isBusiness;
    } catch (e) {
      this.isBusiness = !this.isBusiness;
      throw e;
    }
  }

  matches(search) {
    search = search.toLowerCase();
    return [this.fullName, this.shortName, this.email].some(thing => thing.toLowerCase().includes(search));
  }
}
