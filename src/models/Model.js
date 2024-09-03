export default class Model {
  static api;
  static cache;

  static async loadAll() {
    if (!this.cache.all) {
      const all = await this.api.getAll();

      this.cache.all = [];

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

  static loadData(data) {
    const models = [];

    data.forEach(modelData => {
      if (!this.cache[modelData._id]) {
        const model = new this(modelData);
        this.cache[model._id] = model;
        this.cache.all?.push(model);
      }

      models.push(this.cache[modelData._id]);
    });

    return models;
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
      const data = await this.api.create(this.serialize());
      Object.keys(data).forEach(name => this[name] = data[name]);
      this.cache[this._id] = this;
      this.cache.all?.push(this);
    }

    return this;
  }

  async delete() {
    const index = this.cache.all?.indexOf(this);

    delete this.cache[this._id];

    if (index > -1) {
      this.cache.all.splice(index, 1);
    }

    try {
      await this.api.delete(this._id);
    } catch (e) {
      this.cache[this._id] = this;

      if (index > -1) {
        this.cache.all.splice(index, 0, this);
      }

      throw e;
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