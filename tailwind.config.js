/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        secondary: '#3C5B6F',
        table: '#153448',
        text: '#E2F4C5',
        back: '#496989',
      },
      // colors: {
      //   primary: {"300":"#93c5fd","500":"#60a5fa","600":"#93c5fd","700":"#93c5fd"},
      //   secondary: '#F9F3CC',
      //   table: '#D7E5CA',
      //   text: '#31363F',
      //   back: '#D2E0FB',
      // }
    },
  },
  plugins: [],
}

