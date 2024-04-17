/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: 'Inter', // Adds a new `font-roboto` class
        PlexMono: 'IBM Plex Mono', // Adds a new `font-pacifico` class
        caveat: 'Caveat' // Adds a new `font-caveat` class
      },
    },
  },
  plugins: [],
}

