import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {api} from "../services/api";

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (authContext === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    const {user, setUser, isLoading} = authContext;

    const isAuthenticated: boolean = user !== null;
    const logout = () => {
        setUser(null)
        void api.post("/user/logout");
    }

    return {isAuthenticated, user, setUser, logout, isLoading};
}