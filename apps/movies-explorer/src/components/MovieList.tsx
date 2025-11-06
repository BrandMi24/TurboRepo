import { useMovies } from '../context/MoviesContext';
import MovieItem from './MovieItem';

export default function MovieList() {
  const { movies, status, errorMsg, selectMovie, total, page, query, doSearch } = useMovies();

  const totalPages = Math.max(1, Math.ceil(total / 9)); // 👈 base 9

  if (status === 'loading') return <div className="card">Cargando…</div>;
  if (status === 'error') return <div className="card error">Error: {errorMsg}</div>;

  return (
    <div className="card">
      <h2>Resultados</h2>
      {movies.length === 0 ? (
        <div>Sin resultados. Intenta otra búsqueda.</div>
      ) : (
        <>
          <ul className="grid-list">
            {movies.map(m => (
              <MovieItem key={m.imdbID} movie={m} onSelect={selectMovie} />
            ))}
          </ul>

          <div className="pagination">
            <button
              disabled={page <= 1}
              onClick={() => doSearch(query, page - 1)}
            >
              ◀ Anterior
            </button>

            <span>Página {page} / {totalPages}</span>

            <button
              disabled={page >= totalPages}
              onClick={() => doSearch(query, page + 1)}
            >
              Siguiente ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
