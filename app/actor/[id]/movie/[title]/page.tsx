// app/actor/[id]/movie/[title]/page.tsx
import actors from '../../../../../data/actors.json';

export default function MoviePage({
    params,
}: {
    params: { id: string; title: string };
}) {
    const actor = actors.find(a => a.ID === params.id);
    if (!actor) return <div>Actor not found.</div>;

    const movie = actor.Movies.find(
        m => decodeURIComponent(m.title) === decodeURIComponent(params.title)
    );

    if (!movie) return <div>Movie not found for this actor.</div>;

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-4"><strong>Release Year:</strong> {movie.year}</p>
            <p className="mt-2"><strong>Description:</strong></p>
            <p className="mt-1">{movie.description}</p>
        </main>
    );
}
