export default class Model {
  static api;
  static cache = {};

  static async loadAll() {
    if (!this.cache.all) {
      this.cache.all = [];

      const all = await this.api.getAll();
      console.log("fetching?");
      all.forEach(data => {
        const model = this.cache[data._id] || new this(data);
        this.cache[model._id] = model;
        this.cache.all.push(model);
      });
    }

    return this.cache.all;
  }

  static loadMany(...ids) {
    return Promise.all(ids.map(id => this.load(id)));
  }

  static async load(id) {
    if (!this.cache[id]) {
      const data = await this.api.read(id);
      this.cache[id] = new this(data);
    }

    return this.cache[id];
  }

  get api() {
    return this.constructor.api;
  }

  get cache() {
    return this.constructor.cache;
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
      this.cache[_id] = this;
    }

    return this;
  }

  async delete() {
    const index = this.cache.all?.indexOf(this);

    await this.api.delete(this._id);
    delete this.cache[this._id];

    if (index && index > -1) {
      this.cache.all.splice(index, 1);
    }
  }

  fromObject({ }) {
    return this;
  }

  toObject() {
    return {};
  }

  serialize() {
    return {};
  }
}