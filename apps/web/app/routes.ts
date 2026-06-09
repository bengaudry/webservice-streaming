import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/auth/login.tsx"),
    route("/register", "routes/auth/register.tsx"),
    route("/logout", "routes/auth/logout.tsx"),
    route("/music/:id", "routes/music.tsx")
] satisfies RouteConfig;
