import axios from "axios";
import { API_BASE_URL } from "../constants";

export class UserService {
  static async login(email: string, password: string) {
    const { data } = await axios.post(API_BASE_URL + "/login", {
      email,
      password,
    });

    if ("errors" in data) {
      throw new Error(data.errors);
    }

    return data.access_token;
  }

  static async register(name: string, email: string, password: string) {
    const { data } = await axios.post(API_BASE_URL + "/user/create", {
      name,
      email,
      password,
    });

    if ("errors" in data) {
      throw new Error(data.error);
    }

    return data.access_token;
  }
}
