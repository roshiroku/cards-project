import api from "../utils/api";
import API from "./API";

export default class CardsAPI extends API {
  static apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

  static toggleLike(id) {
    return api(`${this.apiUrl}/${id}`, { method: "patch" });
  }

  static myCards() {
    return api(`${this.apiUrl}/my-cards`);
  }
}