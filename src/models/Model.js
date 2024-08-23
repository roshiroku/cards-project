export default class Model {
  static schema = {};

  static labels = {};

  static fromForm(_) {
    return new Model();
  }

  constructor() { }

  toForm() {
    return {};
  }
}