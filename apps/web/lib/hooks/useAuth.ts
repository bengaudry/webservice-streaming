import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (authContext === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    const isAuthenticated = () => authContext.data !== null;
    const getToken = () => authContext.data ? authContext.data.accessToken : null
    const getUser = () => authContext.data ? authContext.data.user : null

    const setAccessToken = authContext.setAccessToken
    const setUser = authContext.setUser

    return { isAuthenticated, getToken, getUser, setAccessToken, setUser };
}
