import { useMovies } from '../context/MoviesContext';
import fallbackPoster from '../assets/image_not_found.jpg';
import movie from '../assets/cine.png';

export default function MovieDetails() {
  const { selected, setSelected } = useMovies();

  // 👉 Estado cuando no hay película seleccionada
  if (!selected) {
    return (
      <div className="card empty-state">
        <div className="empty-content">
          <img
            src={movie}
            alt="Sin película"
            className="empty-img"
          />
          <h3>Selecciona una película</h3>
          <p>Haz clic en una de la lista para ver sus detalles.</p>
        </div>
      </div>
    );
  }

  const {
    Title,
    Year,
    Poster,
    Genre,
    Runtime,
    Director,
    Actors,
    Plot,
    imdbRating,
  } = selected;

  const validPoster = Poster && Poster !== 'N/A' ? Poster : fallbackPoster;

  return (
    <div className="card">
      <div className="details-header">
        <h2>
          {Title} <span className="pill">{Year}</span>
        </h2>
        <button
          className="close-btn"
          onClick={() => setSelected(null)}
          title="Cerrar"
        >
          ✕
        </button>
      </div>

      <div className="details-body">
        <img
          className="poster"
          src={validPoster}
          alt={Title}
          onError={(e) => {
            if (e.currentTarget.src !== fallbackPoster) {
              e.currentTarget.src = fallbackPoster;
            }
          }}
        />
        <div className="details-meta">
          <p><strong>Género:</strong> {Genre ?? 'N/A'}</p>
          <p><strong>Duración:</strong> {Runtime ?? 'N/A'}</p>
          <p><strong>Director:</strong> {Director ?? 'N/A'}</p>
          <p><strong>Actores:</strong> {Actors ?? 'N/A'}</p>
          <p><strong>IMDb:</strong> ⭐ {imdbRating ?? 'N/A'}</p>
          <p className="plot"><strong>Sinopsis:</strong> {Plot ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
