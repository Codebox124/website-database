// app/actor/[id]/movie/[title]/page.tsx

import { notFound } from 'next/navigation';
import actors from '../../../../../data/actors.json';

type Props = {
  params: {
    id: string;
    title: string;
  };
};

export default function MoviePage({ params }: Props) {
  const actor = actors.find((a) => a.ID === params.id);
  if (!actor) return notFound();

  const movie = actor.Movies.find(
    (m) => decodeURIComponent(m.title) === decodeURIComponent(params.title)
  );

  if (!movie) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="mt-4">
        <strong>Release Year:</strong> {movie.year}
      </p>
      <p className="mt-2">
        <strong>Description:</strong>
      </p>
      <p className="mt-1">{movie.description}</p>
    </main>
  );
}
