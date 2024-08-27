import API from "./API";

export default class CardsAPI extends API {
  static apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

  static toggleLike(id) {
    return this.request(`${this.apiUrl}/${id}`, { method: "patch" });
  }

  static myCards() {
    return this.request(`${this.apiUrl}/my-cards`);
  }
}