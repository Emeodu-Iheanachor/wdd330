import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({

    // GitHub Pages
    base: mode === "github"
        ? "/wdd330/"
        : "/",

    build: {

        // Production files
        outDir: "dist",

        // Remove previous build before creating a new one
        emptyOutDir: true,

        rollupOptions: {

            input: {

                // Home
                main: resolve(
                    __dirname,
                    "src/index.html"
                ),

                // Categories
                categories: resolve(
                    __dirname,
                    "src/categories/index.html"
                ),

                // Details
                details: resolve(
                    __dirname,
                    "src/details/index.html"
                ),

                // Search
                search: resolve(
                    __dirname,
                    "src/search/index.html"
                ),

                // Favorites
                favorites: resolve(
                    __dirname,
                    "src/favorites/index.html"
                ),

                // Resources
                resources: resolve(
                    __dirname,
                    "src/resources/index.html"
                ),

                // About
                about: resolve(
                    __dirname,
                    "src/about/index.html"
                ),

                // Profile
                profile: resolve(
                    __dirname,
                    "src/profile/index.html"
                )

            }

        }

    }

}));
