import { PawPrint, Heart, Eye, Zap } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Sobre Felinos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebramos la belleza, elegancia y misterio de nuestros compañeros felinos a través de la tecnología
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Pasión por los Gatos</h3>
                <p className="text-muted-foreground">
                  Creemos que los gatos merecen ser celebrados por su gracia, independencia y personalidad única
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/20">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visión Global</h3>
                <p className="text-muted-foreground">
                  Queremos compartir la belleza de los gatos del mundo con todos los amantes felinos
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tecnología Moderna</h3>
                <p className="text-muted-foreground">
                  Utilizamos The Cat API para traerte las mejores imágenes de gatos en tiempo real
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card border border-border rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <PawPrint className="w-8 h-8" />
                <span className="text-2xl font-bold">¿Por qué Felinos?</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Felinos es más que una galería de gatos. Es una celebración de estas criaturas extraordinarias que han
                cautivado la civilización durante miles de años. Desde los gatos salvajes hasta nuestros compañeros
                domésticos, cada uno tiene una historia que contar y una belleza que admirar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro objetivo es proporcionar una plataforma donde los amantes de los gatos puedan explorar, admirar
                y conectar con la belleza felina en todas sus formas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
