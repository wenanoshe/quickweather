import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Quick weather",
        name: "Quick weather",
        description: "Search the weather for any place of the world quickly",
        icons: [
          {
            src: "/images/icon-quick-weather.png",
            type: "image/png",
            sizes: "460x460",
          },
          {
            src: "/images/icon-quick-weather(180x180).png",
            type: "image/png",
            sizes: "180x180",
          },
          {
            src: "/images/icon-quick-weather(512x512).png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        display: "standalone",
        theme_color: "#3399ff",
        background_color: "#fff",
      },
    }),
  ],
  server: {
    open: true,
  },
});
