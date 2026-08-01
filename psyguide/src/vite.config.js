import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  // GitHub Pages uses a repository path.
  // Render uses the site root.
  base: mode === "github" ? "/wdd330/psyguide/" : "/",

  root: "src",

  build: {
    outDir: "../dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        categories: resolve(__dirname, "src/categories/index.html"),
        resources: resolve(__dirname, "src/resources/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
        profile: resolve(__dirname, "src/profile/index.html"),
        details: resolve(__dirname, "src/details/index.html"),
      },
    },
  },
}));
