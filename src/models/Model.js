export default class Model {
  static api;
  static schema = {};
  static labels = {};

  static async load(id) {
    const data = await this.api.read(id);
    return new this(data);
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