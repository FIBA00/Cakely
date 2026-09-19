import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
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
  resolve: { alias: { "@": path.resolve(projectRoot, "./client/src") } },
  root: "client",
  build: {
    outDir: "../dist/public",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["lucide-react"],
          "vendor-ui": ["sonner", "next-themes"],
        },
      },
    },
  },
});
