import type {Route} from "./+types/home";
import type {Paginated} from "../../lib/types/Paginated";
import {type Musique, MusiqueService} from "../../lib/services/MusiqueService";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    const [musiques, setMusiques] = useState<Paginated<Musique> | null | undefined>(undefined);

    const isLoading = musiques === undefined;
    const hasError = musiques === null;
    const isCorrect = musiques !== null && musiques !== undefined;

    useEffect(() => {
        setMusiques(undefined);
        MusiqueService.all().then(setMusiques).catch(() => setMusiques(null))
    }, [])

    return <div>

        {isLoading && (<p>Chargement...</p>)}
        {hasError && (<p>Erreur</p>)}
        {isCorrect && (<ul className="flex flex-col gap-4 p-6 max-w-md mx-auto">
            {musiques.data.map((musique) => (
                <li className="not-last:border-b border-neutral-800 py-3 flex flex-row items-center justify-between gap-6">
                    <div>
                        <span className="block text-lg">{musique.nom}</span>
                        <span className="text-sm text-neutral-500">{musique.artiste.nom}</span>
                    </div>

                    <span>{musique.prix}</span>
                </li>
            ))}
        </ul>)}

    </div>;
}
