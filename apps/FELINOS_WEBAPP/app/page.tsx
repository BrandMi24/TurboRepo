"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import CatGallery from "@/components/cat-gallery"
import CatDetail from "@/components/cat-detail"
import AboutSection from "@/components/about-section"
import SaySomething from "@/components/say-something"
import Footer from "@/components/footer"

type Cat = {
  id: string
  url: string
}

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([])
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    loadMoreCats()
  }, [])

  const loadMoreCats = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=12&order=RANDOM")
      const data = await response.json()
      const newCats = data.map((cat: { id: string; url: string }) => ({
        id: cat.id,
        url: cat.url,
      }))
      setCats((prev) => [...prev, ...newCats])
    } catch (error) {
      console.error("[v0] Error loading cats:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="flex-grow">
        {selectedCat ? (
          <CatDetail cat={selectedCat} onBack={() => setSelectedCat(null)} />
        ) : (
          <>
            <CatGallery cats={cats} onSelectCat={setSelectedCat} loading={loading} />

            {cats.length > 0 && (
              <div className="flex justify-center py-12">
                <button
                  onClick={loadMoreCats}
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:-translate-y-1"
                >
                  {loading ? "Cargando más gatos..." : "Cargar más gatos"}
                </button>
              </div>
            )}

            <AboutSection />
            <SaySomething />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
