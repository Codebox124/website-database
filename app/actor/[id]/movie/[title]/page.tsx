import { notFound } from 'next/navigation';
import actors from '../../../../../data/actors.json';

interface MovieParams {
  id: string;
  title: string;
}

// Define a mock PageProps interface that matches the error's expectations
interface CustomPageProps {
  params: Promise<MovieParams>;
}

export default async function MoviePage({ params }: { params: MovieParams }) {
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