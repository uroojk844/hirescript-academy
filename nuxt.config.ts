import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/content"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  ui: {
    colorMode: true,
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-dark",
            dark: "github-dark",
          },
        },
        toc: {
          depth: 3,
        },
      },
    },
  },
});
