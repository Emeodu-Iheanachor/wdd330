import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "github" ? "/wdd330/psyguide/" : "/",

  build: {
    outDir: "dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),

        categories: resolve(
          import.meta.dirname,
          "src/categories/index.html"
        ),

        resources: resolve(
          import.meta.dirname,
          "src/resources/index.html"
        ),

        about: resolve(
          import.meta.dirname,
          "src/about/index.html"
        ),

        profile: resolve(
          import.meta.dirname,
          "src/profile/index.html"
        ),

        details: resolve(
          import.meta.dirname,
          "src/details/index.html"
        ),
      },
    },
  },
}));
