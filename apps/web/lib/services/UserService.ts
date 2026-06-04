import axios from "axios";
import { API_BASE_URL } from "../constants";

export interface ValidationErrors {
  [key: string]: string[];
}

export class UserService {
  static async login(email: string, password: string) {
    try {
      const { data } = await axios.post(API_BASE_URL + "/login", {
        email,
        password,
      });

      if ("errors" in data) {
        const error = new Error("Validation failed");
        (error as any).errors = data.errors as ValidationErrors;
        throw error;
      }

      return data.access_token;
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const error = new Error("Validation failed");
        (error as any).errors = err.response.data.errors as ValidationErrors;
        throw error;
      }
      throw err;
    }
  }

  static async register(name: string, email: string, password: string) {
    try {
      const { data } = await axios.post(API_BASE_URL + "/user/create", {
        name,
        email,
        password,
      });

      if ("errors" in data) {
        const error = new Error("Validation failed");
        (error as any).errors = data.errors as ValidationErrors;
        throw error;
      }

      return data.access_token;
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const error = new Error("Validation failed");
        (error as any).errors = err.response.data.errors as ValidationErrors;
        throw error;
      }
      throw err;
    }
  }
}
