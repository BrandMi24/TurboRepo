"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Heart, Maximize2 } from "lucide-react"

type Cat = {
  id: string
  url: string
}

type CatGalleryProps = {
  cats: Cat[]
  onSelectCat: (cat: Cat) => void
  loading: boolean
}

export default function CatGallery({ cats, onSelectCat, loading }: CatGalleryProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (e: React.MouseEvent, catId: string) => {
    e.stopPropagation()
    const newFavorites = new Set(favorites)
    if (newFavorites.has(catId)) {
      newFavorites.delete(catId)
    } else {
      newFavorites.add(catId)
    }
    setFavorites(newFavorites)
  }

  if (cats.length === 0 && loading) {
    return (
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Descubre la belleza felina</h2>
            <p className="text-lg text-muted-foreground">Cargando gatos increíbles...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Descubre la belleza felina</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra galería de gatos hermosos y únicos. Haz clic en cualquier felino para verlo en detalle.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 glow-accent"
              onClick={() => onSelectCat(cat)}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={cat.url || "/placeholder.svg"}
                  alt="Cute cat"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Action Buttons */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectCat(cat)
                  }}
                  className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  aria-label="View full image"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(e, cat.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/90 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Add to favorites"
              >
                <Heart
                  className={`w-5 h-5 transition-colors dark:text-orange-500 text-black ${
                    favorites.has(cat.id) ? "fill-accent stroke-accent dark:fill-orange-500 dark:stroke-orange-500" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
