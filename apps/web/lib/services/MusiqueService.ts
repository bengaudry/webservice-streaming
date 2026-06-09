import axios from "axios";
import {API_BASE_URL} from "../constants";
import type {Paginated} from "../types/Paginated";
import {Service} from "./Service";

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
        const {data} = await axios.get(API_BASE_URL + "/musics?include=artiste&page=" + pageNumber);
        return data;
    }

    static async free(pageNumber: number = 1): Promise<Paginated<Musique>> {
        const {data} = await axios.get(API_BASE_URL + "/musics/free?include=artiste&page=" + pageNumber);
        return data;
    }

    static async get(accessToken: string, musiqueId: number): Promise<{ musique: Musique; owns?: boolean }> {
        const {data: musique} = await axios.get(API_BASE_URL + "/musics/" + musiqueId + "?include=artiste");

        let owns: boolean | undefined = undefined;
        if (accessToken) {
            const {data: ownsData} = await axios.get(API_BASE_URL + "/musics/owns", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            owns = ownsData.owns;
        }

        return {musique, owns};
    }

    static async buy(accessToken: string, id: number): Promise<void> {
        console.log(accessToken)
        const {data} = await axios.post(API_BASE_URL + "/musics/buy", {
            musique_id: id,
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!("success" in data) || data.success !== true) throw new Error("")
    }
}
