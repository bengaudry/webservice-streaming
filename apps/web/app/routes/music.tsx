import type {Route} from "./+types/music"
import {MusiqueService} from "../../lib/services/MusiqueService";
import {useAuth} from "../../lib/hooks/useAuth";
import {redirect, useNavigate} from "react-router";

export async function loader({params}: Route.LoaderArgs) {
    console.log(params.id, parseInt(params.id))

    const {getToken} = useAuth()

    const token = getToken()
    if (!token) {
        return redirect("/")
    }

    return await MusiqueService.get(token, parseInt(params.id));
}

export default function MusicDetailsPage({loaderData}: Route.ComponentProps) {
    const buyBtnLabel = loaderData.owns
        ? "Acheté"
        : `Acheter (${loaderData.musique.prix}€)`

    const auth = useAuth()
    const navigate = useNavigate()

    const handleClickBtn = () => {
        const accessToken = auth.getToken()
        if (!accessToken || !auth.isAuthenticated()) {
            return navigate("/login")
        }
        MusiqueService.buy(accessToken, loaderData.musique.id).then(() => navigate("#")).catch(alert)
    }

    return <div className="p-6">
        <h1 className="font-bold text-3xl mb-1">{loaderData.musique.nom}</h1>
        <span>{loaderData.musique.artiste.nom}</span>

        <button disabled={loaderData.owns}
                className="block mt-4 bg-blue-500 rounded-md py-2 px-6 font-semibold disabled:opacity-20"
                onClick={handleClickBtn}>
            {buyBtnLabel}
        </button>
    </div>
}
