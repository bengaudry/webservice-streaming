import {API_BASE_URL} from "../constants";
import axios from "axios";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
})

// Intercepteur pour INJECTER le token dans chaque requête sortante
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour GERER l'expiration (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Si le token est expiré ou invalide, on nettoie tout et on redirige
            sessionStorage.removeItem("access_token");
            window.location.href = "/logout";
        }
        return Promise.reject(error);
    }
);
