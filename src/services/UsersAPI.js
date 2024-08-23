import api from "../utils/api";

export default class UsersAPI {
  static apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

  static get(id) {
    return api(`${this.apiUrl}/${id}`);
  }

  static login(data) {
    return api(`${this.apiUrl}/login`, { data, method: "post" });
  }

  static register(data) {
    return api(`${this.apiUrl}/register`, { data, method: "post" });
  }
}