import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [],
      manifest: {
        id: "/",
        name: "Cakely — Cakes for your moments",
        short_name: "Cakely",
        description:
          "A thoughtful cake counter for every moment worth celebrating.",
        lang: "en",
        start_url: "/",
        scope: "/",
        theme_color: "#c93f63",
        background_color: "#fffaf5",
        display: "standalone",
        orientation: "portrait-primary",
        categories: ["food", "shopping"],
        icons: [
          {
            src: "/manus-storage/cakely-logo_0cb6587f.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /^\/account/,
          /^\/owner/,
          /^\/admin/,
          /^\/checkout/,
          /^\/order/,
        ],
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,webp,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\//i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "cake-images",
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 14 },
            },
          },
        ],
      },
    }),
  ],
});
