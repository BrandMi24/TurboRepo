/** @type {import('tailwindcss').Config} */
export default {
  // fuerza “modo clase” y que el selector sea <html class="dark">
  darkMode: ["class", "html.dark"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
