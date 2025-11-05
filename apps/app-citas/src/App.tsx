import { Link, Outlet, NavLink } from "react-router-dom";
import { useTheme } from "./theme";

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200
                         dark:bg-slate-900/70 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600" />
            <h1 className="text-lg font-semibold tracking-tight">App Citas</h1>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-100
                 dark:hover:bg-slate-800 ${
                   isActive
                     ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                     : "text-slate-600 dark:text-slate-300"
                 }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/nueva"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white hover:bg-blue-600"
                    : "text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:ring-blue-900/40 dark:hover:bg-blue-950/20"
                }`
              }
            >
              Agendar
            </NavLink>

            {/* Switch de tema */}
            <button
              onClick={() => setTheme( theme === "dark" ? "light" : "dark" )}
              className="ml-1 px-3 py-1.5 rounded-md text-sm ring-1 ring-slate-200 hover:bg-slate-100
                        dark:ring-slate-700 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500 dark:text-slate-400 text-center">
          © {new Date().getFullYear()} App Citas · Demo académica
        </div>
      </footer>
    </div>
  );
}
