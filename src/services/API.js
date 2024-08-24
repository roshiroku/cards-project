import api from "../utils/api";

export default class API {
  static apiUrl;

  static getAll() {
    return api(this.apiUrl);
  }

  static create(data) {
    return api(this.apiUrl, { data, method: "post" });
  }

  static read(id) {
    return api(`${this.apiUrl}/${id}`);
  }

  static update(id, data) {
    return api(`${this.apiUrl}/${id}`, { data, method: "put" });
  }

  static delete(id) {
    return api(`${this.apiUrl}/${id}`, { method: "delete" });
  }
}