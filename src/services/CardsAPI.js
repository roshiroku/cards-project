import api from "../utils/api";

export default class CardsAPI {
  static apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

  static all() {
    return api(this.apiUrl);
  }

  static add(data) {
    return api(this.apiUrl, { data, method: "post" });
  }

  static get(id) {
    return api(`${this.apiUrl}/${id}`);
  }

  static edit(id, data) {
    return api(`${this.apiUrl}/${id}`, { data, method: "put" });
  }

  static remove(id) {
    return api(`${this.apiUrl}/${id}`, { method: "delete" });
  }

  static toggleLike(id) {
    return api(`${this.apiUrl}/${id}`, { method: "patch" });
  }

  static myCards() {
    return api(`${this.apiUrl}/my-cards`);
  }
}