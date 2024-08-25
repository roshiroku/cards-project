export default class Model {
  static api;

  static async loadMany(...ids) {
    let models = [];

    if (ids.length) {
      models = await Promise.all(ids.map(id => this.api.read(id)));
    } else {
      models = await this.api.getAll();
    }

    return models.map(data => new this(data));
  }

  static async load(id) {
    const data = await this.api.read(id);
    return new this(data);
  }

  static loadFromStorage(key = `${this.name.toLowerCase()}s`) {
    const models = JSON.parse(localStorage.getItem(key)) || [];
    return models.map(data => new this(data));
  }

  static saveToStorage(models, key = `${this.name.toLowerCase()}s`) {
    localStorage.setItem(key, JSON.stringify(models));
  }

  static fromObject({ }) {
    return new Model();
  }

  get api() {
    return this.constructor.api;
  }

  constructor({ _id = "", createdAt = "" } = {}) {
    this._id = _id;
    this.createdAt = createdAt;
  }

  async save() {
    if (this._id) {
      await this.api.update(this._id, this.serialize());
    } else {
      const { _id, createdAt } = await this.api.create(this.serialize());
      this._id = _id;
      this.createdAt = createdAt;
    }
  }

  async delete() {
    await this.api.delete(this._id);
  }

  toObject() {
    return {};
  }

  serialize() {
    return {};
  }
}