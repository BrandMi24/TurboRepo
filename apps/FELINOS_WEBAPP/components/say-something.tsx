"use client"

import { useState } from "react"
import Image from "next/image"
import { Download, Loader2 } from "lucide-react"

export default function SaySomething() {
  const [text, setText] = useState("")
  const [fontSize, setFontSize] = useState(24)
  const [fontColor, setFontColor] = useState("white")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!text.trim()) return

    setLoading(true)
    try {
      const encodedText = encodeURIComponent(text)
      const url = `https://cataas.com/cat/says/${encodedText}?fontSize=${fontSize}&fontColor=${fontColor}`
      setImageUrl(url)
    } catch (error) {
      console.error("[v0] Error generating cat image:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!imageUrl) return

    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `cat-says-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Download failed:", error)
    }
  }

  return (
    <section id="say-something" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Dilo con tus palabras</h2>
          <p className="text-lg text-muted-foreground">
            Crea mensajes personalizados con gatos. Escribe lo que quieras y un gato lo dirá por ti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6 bg-background border border-border rounded-2xl p-8">
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Tu Mensaje
              </label>
              <textarea
                id="message"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 100))}
                placeholder="Escribe tu mensaje aquí (máx. 100 caracteres)..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">{text.length}/100</p>
            </div>

            <div>
              <label htmlFor="fontSize" className="block text-sm font-semibold mb-2">
                Tamaño de Fuente: {fontSize}px
              </label>
              <input
                type="range"
                id="fontSize"
                min="10"
                max="60"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="fontColor" className="block text-sm font-semibold mb-2">
                Color de Fuente
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="fontColor"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value.replace("#", ""))}
                  className="w-12 h-12 rounded-lg cursor-pointer border border-border"
                />
                <span className="text-sm text-muted-foreground">#{fontColor}</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!text.trim() || loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generando...
                </>
              ) : (
                "Generar Gato"
              )}
            </button>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-4">
            <div className="bg-background border border-border rounded-2xl p-8 flex-grow flex items-center justify-center min-h-64">
              {imageUrl ? (
                <div className="relative w-full h-full max-h-96">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt="Cat saying your message"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <p className="text-muted-foreground text-center">Tu gato aparecerá aquí</p>
              )}
            </div>

            {imageUrl && (
              <button
                onClick={handleDownload}
                className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Download className={`w-4 h-4 ${copied ? "hidden" : ""}`} />
                <span>{copied ? "¡Descargado!" : "Descargar Imagen"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
