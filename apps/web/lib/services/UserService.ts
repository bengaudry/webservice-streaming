import {api} from "./api";

export interface ValidationErrors {
    [key: string]: string[];
}

export class UserService {
    static async login(email: string, password: string) {
        try {
            const {data} = await api.post("/api/login", {
                email,
                password,
            });

            if ("errors" in data) {
                const error = new Error("Validation failed");
                (error as any).errors = data.errors as ValidationErrors;
                throw error;
            }

            sessionStorage.setItem("access_token", data.access_token);
            return {user: data.user}
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
            const {data} = await api.post("/api/user/create", {
                name,
                email,
                password,
            });

            if ("errors" in data) {
                const error = new Error("Validation failed");
                (error as any).errors = data.errors as ValidationErrors;
                throw error;
            }

            sessionStorage.setItem("access_token", data.access_token);
            return {user: data.user}
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
