import {AuthContext, type User} from "../context/AuthContext";
import {type PropsWithChildren, useState} from "react";

export const AuthProvider = ({children}: PropsWithChildren) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    return (<AuthContext.Provider value={{
        setAccessToken,
        setUser,
        data: accessToken && user ? {
            accessToken,
            user
        } : null
    }}>{children}</AuthContext.Provider>)
}
