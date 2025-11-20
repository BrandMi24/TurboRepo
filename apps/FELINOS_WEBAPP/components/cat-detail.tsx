"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Heart, Share2, Download, Check } from "lucide-react"

type Cat = {
  id: string
  url: string
}

type CatDetailProps = {
  cat: Cat
  onBack: () => void
}

export default function CatDetail({ cat, onBack }: CatDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch(cat.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `cat-${cat.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2000)
    } catch (error) {
      console.error("[v0] Download failed:", error)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Beautiful Cat",
          text: "Check out this beautiful cat!",
          url: window.location.href,
        })
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      // If share fails, try clipboard as fallback
      if (error instanceof Error && error.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(window.location.href)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (clipboardError) {
          console.error("[v0] Share and clipboard failed:", clipboardError)
        }
      }
    }
  }

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 mb-8 hover:-translate-x-1"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Volver a la galería</span>
        </button>

        {/* Main Image Container */}
        <div className="relative bg-gradient-to-br from-muted to-muted/50 rounded-3xl overflow-hidden shadow-2xl mb-8 aspect-square md:aspect-auto md:h-96 lg:h-[500px]">
          <Image
            src={cat.url || "/placeholder.svg"}
            alt="Detailed cat view"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
          />

          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  isFavorite ? "fill-accent stroke-accent" : "stroke-primary dark:stroke-primary"
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Share"
              title={copied ? "¡Enlace copiado!" : "Compartir"}
            >
              {copied ? (
                <Check className="w-6 h-6 stroke-accent" />
              ) : (
                <Share2 className="w-6 h-6 stroke-primary dark:stroke-primary" />
              )}
            </button>
            <button
              onClick={handleDownload}
              className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Download"
              title={downloaded ? "¡Descargado!" : "Descargar"}
            >
              {downloaded ? (
                <Check className="w-6 h-6 stroke-accent" />
              ) : (
                <Download className="w-6 h-6 stroke-primary dark:stroke-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Un gato hermoso</h1>
              <p className="text-lg text-muted-foreground">
                Capturado en toda su gloria felina. Los gatos son criaturas fascinantes llenas de gracia, misterio e
                independencia.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div>
                <h3 className="font-semibold text-primary mb-2">Datos curiosos felinos</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Los gatos tienen visión nocturna 6 veces mejor que los humanos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Pueden ronronear a diferentes frecuencias para comunicarse</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Duermen entre 12 y 16 horas al día</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Tienen más de 20 músculos en cada oreja</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="font-semibold text-primary mb-3">Detalles de la imagen</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">ID de imagen</span>
                  <span className="font-mono text-sm text-foreground">{cat.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Fuente</span>
                  <span className="text-foreground">The Cat API</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Licencia</span>
                  <span className="text-foreground">Libre para usar</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <button
                onClick={onBack}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Ver más gatos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
