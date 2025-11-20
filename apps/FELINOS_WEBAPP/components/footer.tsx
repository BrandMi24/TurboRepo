import { PawPrint, Heart, Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg">Felinos</span>
            </div>
            <p className="text-muted-foreground text-sm">Celebrando la belleza y elegancia de los gatos del mundo</p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Enlaces</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://thecatapi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  The Cat API
                </a>
              </li>
              <li>
                <a
                  href="https://cataas.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  The Cataas API
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors duration-300">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors duration-300">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Estadísticas</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gatos disponibles</span>
                <span className="text-foreground font-semibold">Miles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Usuarios activos</span>
                <span className="text-foreground font-semibold">Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2025 Felinos. Hecho con <Heart className="w-3 h-3 inline fill-accent text-accent" /> para los amantes de
              gatos
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/CUCHO20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jesus-hector-vela/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground">
              Powered by{" "}
              <a
                href="https://thecatapi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-300 font-semibold"
              >
                The Cat API
              </a> and <a
                href="https://cataas.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-300 font-semibold"
              >
                The Cataas API
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
