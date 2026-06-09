import {useAuth} from "../hooks/useAuth";

export abstract class Service {

    protected static getAccessToken(): string | null {
        try {
            return this.getAccessTokenOrThrow()
        } catch (e) {
            return null;
        }
    }

    protected static getAccessTokenOrThrow(): string | null {
        return useAuth().getToken();
    }

}
