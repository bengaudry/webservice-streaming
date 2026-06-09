import {AuthContext, type User} from "../context/AuthContext";
import {type PropsWithChildren, useState, useEffect} from "react";
import {api} from "../services/api";

export const AuthProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");

        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        console.log("verification de la connexion")
        api.get("/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
                sessionStorage.removeItem("access_token");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        isLoading ? (
            <div className="flex h-screen items-center justify-center">
                <span>Chargement de la session...</span>
            </div>
        ) : (
            <AuthContext.Provider value={{user, setUser, isLoading}}>
                {children}
            </AuthContext.Provider>
        )
    );

};