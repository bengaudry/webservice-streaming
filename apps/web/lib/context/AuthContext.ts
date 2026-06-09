import {createContext} from "react";

export type User = {
    id: number;
    email: string;
    name: string;
}

export const AuthContext = createContext<{
    data: {
        accessToken: string;
        user: User
    } | null
    setAccessToken: (accessToken: string) => void;
    setUser: (user: User) => void;
} | undefined>(undefined);
