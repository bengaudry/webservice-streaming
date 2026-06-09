import type {Route} from "./+types/music"
import {type Musique, MusiqueService} from "../../lib/services/MusiqueService";
import {useAuth} from "../../lib/hooks/useAuth";
import {redirect, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export async function loader({params}: Route.LoaderArgs) {
    return {params}
}

export default function MusicDetailsPage({loaderData}: Route.ComponentProps) {
    const {params} = loaderData;
    const musicId = params.id;

    const [musicDetails, setMusicDetails] = useState<{ musique: Musique, owns?: boolean } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMusicDetails = async () => {
            setIsLoading(true);
            setMusicDetails(await MusiqueService.get(parseInt(musicId)));
            setIsLoading(false);
        }
        void fetchMusicDetails();
    }, [musicId]);

    const buyBtnLabel = musicDetails && musicDetails.owns
        ? "Acheté"
        : `Acheter (${musicDetails?.musique.prix ?? '-'}€)`

    const auth = useAuth()
    const navigate = useNavigate()

    const handleClickBtn = () => {
        if (!auth.isAuthenticated) {
            return navigate("/login")
        }
        if (!musicDetails?.musique.id) {
            alert("Un problème est survenu, essayez d'actualiser la page.")
            return;
        }
        try {
            MusiqueService.buy(musicDetails.musique.id)
            navigate("#")
        } catch (e) {
            navigate("/login")
        }
    }

    return <div className="p-6">
        <h1 className="font-bold text-3xl mb-1">{musicDetails?.musique.nom}</h1>
        <span>{musicDetails?.musique.artiste.nom}</span>

        <button disabled={musicDetails?.owns}
                className="block mt-4 bg-blue-500 rounded-md py-2 px-6 font-semibold disabled:opacity-20"
                onClick={handleClickBtn}>
            {buyBtnLabel}
        </button>
    </div>
}
