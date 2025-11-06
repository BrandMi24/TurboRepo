import { useEffect, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import { Moon, Sun } from "lucide-react"; // 👈 instala si no la tienes: npm i lucide-react

export default function Header() {
  const { total } = useMovies();
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  // Cambia la clase del body al cambiar el tema
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="hero">
      <div className="hero-left">
        <div className="logo-badge" aria-hidden>
          <span className="clap">🎬</span>
        </div>

        <div className="title-wrap">
          <h1 className="brand">
            <span className="brand-grad">Movies Explorer</span>
          </h1>

          <div className="chips">
            <span className="chip">
              📈 Resultados: <strong>{total || 0}</strong>
            </span>
          </div>
        </div>
      </div>

      <nav className="hero-actions">
        <button className="btn ghost theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <a
          className="btn ghost"
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noreferrer"
        >
          OMDb API
        </a>
        <a
          className="btn"
          href="https://github.com/BrandMi24/movies-explorer"
          target="_blank"
          rel="noreferrer"
        >
          ⭐ Repo
        </a>
      </nav>
    </header>
  );
}
