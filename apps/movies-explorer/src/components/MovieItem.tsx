import type { MovieSummary } from '../services/omdb';
import fallbackPoster from '../assets/image_not_found.jpg'; // 👈 importa el asset

interface Props {
  movie: MovieSummary;
  onSelect: (id: string) => void;
}

export default function MovieItem({ movie, onSelect }: Props) {
  const { Title, Year, Poster, imdbID, Type } = movie;

  const validPoster =
    Poster && Poster !== 'N/A' ? Poster : fallbackPoster;

  return (
    <li className="movie-item" onClick={() => onSelect(imdbID)} title="Ver detalle">
      <img
        src={validPoster}
        alt={Title}
        onError={(e) => {
          // evita loop infinito si ya es el fallback
          if (e.currentTarget.src !== fallbackPoster) {
            e.currentTarget.src = fallbackPoster;
          }
        }}
      />
      <div className="movie-meta">
        <strong>{Title}</strong>
        <div className="muted">{Year} • {Type}</div>
      </div>
    </li>
  );
}
