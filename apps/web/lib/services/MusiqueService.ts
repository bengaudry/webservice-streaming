import axios from "axios";
import {API_BASE_URL} from "../constants";
import type {Paginated} from "../types/Paginated";

export type Musique = {
    id: number;
    nom: string;
    duree_secondes: number;
    prix: number;

    artiste: {
        id: number;
        nom: string;
    }
}

export class MusiqueService {

    static async all(): Promise<Paginated<Musique>> {
        const {data} = await axios.get(API_BASE_URL + '/musics?include=artiste')
        return data;
    }

}