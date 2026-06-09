import type {Route} from "./+types/home";
import type {Paginated} from "../../lib/types/Paginated";
import {
    type Musique,
    MusiqueService,
} from "../../lib/services/MusiqueService";
import {useEffect, useState} from "react";
import {NavLink, useSearchParams} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    const [musiques, setMusiques] = useState<
        Paginated<Musique> | null | undefined
    >(undefined);

    const isLoading = musiques === undefined;
    const hasError = musiques === null;
    const isCorrect = musiques !== null && musiques !== undefined;

    const [searchParams, setSearchParams] = useSearchParams();
    const [showPaidMusics, setShowPaidMusics] = useState(true);

    const pageNumber = parseInt(searchParams.get("page") ?? "1");

    const fetchMusiques = (includePaidMusics = false) => {
        setMusiques(undefined);
        if (includePaidMusics) {
            MusiqueService.all(pageNumber)
                .then(setMusiques)
                .catch(() => setMusiques(null));
        } else {
            MusiqueService.free(pageNumber)
                .then(setMusiques)
                .catch(() => setMusiques(null));
        }
    }

    useEffect(() => {
        fetchMusiques(showPaidMusics);
    }, [searchParams, showPaidMusics]);

    const handlePaidMusicsCheckboxToggle = () => {
        setShowPaidMusics((s) => !s)
    }

    return (
        <div className="max-w-md mx-auto">
            <header className="mb-5 p-6">
                <label htmlFor="show-paid-musics-checkbox" className="mr-4">
                    Afficher les musiques payantes
                </label>
                <input id="show-paid-musics-checkbox" type="checkbox" onInput={handlePaidMusicsCheckboxToggle} checked={showPaidMusics}/>
            </header>

            {isLoading && <p>Chargement...</p>}
            {hasError && <p>Erreur</p>}
            {isCorrect && (
                <ul className="flex flex-col gap-4">
                    {musiques.data.map((musique) => (
                        <li key={musique.id} className="not-last:border-b border-neutral-800 py-3 px-6 rounded-xl hover:bg-neutral-800 transition-colors">
                            <NavLink to={`/music/${musique.id}`}
                                     className="flex flex-row items-center justify-between gap-6">

                                <div>
                                    <span className="block text-lg">{musique.nom}</span>
                                    <span className="text-sm text-neutral-500">{musique.artiste.nom}</span>
                                </div>

                                <span>{musique.prix == 0 ? "Gratuit" : `${musique.prix}€`}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}

            <footer className="mx-auto w-max text-center mb-6">
                {musiques && (<>
                    <p className="text-neutral-500">Affichage de {musiques.per_page} sur {musiques.total}<br/>
                        Page {musiques.current_page} sur {musiques.last_page}
                    </p>

                    <div className="flex gap-4 items-center mt-4">

                        <NavLink to={`/?page=${musiques.current_page - 1}`}
                                 aria-disabled={musiques.current_page <= 1}
                                 className={"font-medium text-lg block bg-blue-600 aria-disabled:opacity-20 rounded-md px-6 py-2"}>Précédent</NavLink>

                        <NavLink to={`/?page=${musiques.current_page + 1}`}
                                 aria-disabled={musiques.current_page >= musiques.last_page}
                                 className={"font-medium text-lg block bg-blue-600 aria-disabled:opacity-20 rounded-md px-6 py-2"}>Suivant</NavLink>
                    </div>
                </>)}
            </footer>
        </div>
    );
}
