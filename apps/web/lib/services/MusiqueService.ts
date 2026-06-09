import type {Paginated} from "../types/Paginated";
import {Service} from "./Service";
import {api} from "./api";

export type Musique = {
    id: number;
    nom: string;
    duree_secondes: number;
    prix: number;

    artiste: {
        id: number;
        nom: string;
    };
};

export class MusiqueService extends Service {
    static async all(pageNumber: number = 1): Promise<Paginated<Musique>> {
        const {data} = await api.get("/api/musics?include=artiste&page=" + pageNumber);
        return data;
    }

    static async free(pageNumber: number = 1): Promise<Paginated<Musique>> {
        const {data} = await api.get("/api/musics/free?include=artiste&page=" + pageNumber);
        return data;
    }

    static async get(musiqueId: number): Promise<{ musique: Musique; owns?: boolean }> {
        const {data: musique} = await api.get("/api/musics/" + musiqueId + "?include=artiste");

        let owns: boolean | undefined = undefined;
        try {
            const {data: ownsData} = await api.get(`/api/musics/${musiqueId}/own`);
            owns = ownsData.owns;
        } catch (e) {}

        return {musique, owns};
    }

    static async buy(id: number): Promise<void> {
        const {data} = await api.post("/api/musics/buy", {
            musique_id: id,
        });

        if (!("success" in data) || data.success !== true) throw new Error("")
    }
}
