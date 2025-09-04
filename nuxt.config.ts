import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/content", "@vite-pwa/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  ui: {
    colorMode: true,
  },
  app: {
    head: {
      title: "Hirescript Academy",
      meta: [
        {
          name: "description",
          content: "Coading tutorials by Hirescript Academy",
        },
        {
          name: "theme-color",
          content: "#030712",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Hirescript Academy",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
      ],
      link: [
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.svg",
        },
        {
          rel: "apple-touch-icon",
          href: "/favicon.svg",
        },
        {
          rel: "apple-touch-startup-image",
          href: "/favicon.svg",
        },
      ],
    },
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
  pwa: {
    manifest: {
      name: "Hirescript Academy",
      short_name: "Academy",
      description: "Coding tutorial by Hirescript Academy",
      theme_color: "#030712",
      background_color: "#030712",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "favicon.svg",
          sizes: "128x128",
          type: "image/svg",
          purpose: "any",
        },
        {
          src: "favicon.svg",
          sizes: "64x64",
          type: "image/svg",
        },
        {
          src: "favicon.svg",
          sizes: "192x192",
          type: "image/svg",
          purpose: "any",
        },
        {
          src: "favicon.svg",
          sizes: "180x180",
          type: "image/svg",
          purpose: "any",
        },
        {
          src: "favicon.svg",
          sizes: "512x512",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
  },
});
