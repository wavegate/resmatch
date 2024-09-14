import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "frank-lee",
      project: "residency-match",
    }),
    // visualizer({
    //   open: true, // Open the visualization automatically in the browser
    //   gzipSize: true, // Show gzip sizes
    //   brotliSize: true, // Show Brotli sizes
    //   filename: "./dist/stats.html", // Path to the generated stats file
    // }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: true,
  },
});
