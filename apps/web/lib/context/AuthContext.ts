import {createContext} from "react";

export type User = {
    id: number;
    email: string;
    nom: string;
}

export const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean
} | undefined>(undefined);
