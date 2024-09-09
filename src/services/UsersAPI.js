import API from "./API";

export default class UsersAPI extends API {
  static apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

  static login(data) {
    return this.request(`${this.apiUrl}/login`, { data, method: "post" });
  }

  static toggleBusinessStatus(id) {
    return this.request(`${this.apiUrl}/${id}`, { method: "patch" });
  }
}