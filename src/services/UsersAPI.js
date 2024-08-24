import api from "../utils/api";
import API from "./API";

export default class UsersAPI extends API {
  static apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

  static login(data) {
    return api(`${this.apiUrl}/login`, { data, method: "post" });
  }
}