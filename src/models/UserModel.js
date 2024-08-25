import Model from "./Model";
import UsersAPI from "../services/UsersAPI";

export default class UserModel extends Model {
  static api = UsersAPI;

  static fromObject({
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
    houseNumber = 0,
    zip = 0,
    isBusiness = false
  }) {
    return new UserModel({
      _id,
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
    _id = "",
    name = { first: "", middle: "", last: "" },
    phone = "",
    email = "",
    password = "",
    image = { url: "", alt: "" },
    address = { state: "", country: "", city: "", street: "", houseNumber: 0, zip: 0 },
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
    this.isBusiness = isBusiness;
  }

  toObject() {
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

  serialize() {
    return {
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
      image: this.image,
      address: this.address,
      isBusiness: this.isBusiness
    };
  }
}