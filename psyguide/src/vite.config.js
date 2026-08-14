import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({

    // =========================================
    // Base URL
    // =========================================

    base:
        mode === "github"
            ? "/wdd330/psyguide/"
            : "/",


    // =========================================
    // Source Directory
    // =========================================

    root: "src",


    // =========================================
    // Public Assets
    // =========================================

    publicDir: "../public",


    // =========================================
    // Build Configuration
    // =========================================

    build: {

        outDir: "../dist",

        emptyOutDir: true,

        rollupOptions: {

            input: {

                main: resolve(
                    import.meta.dirname,
                    "src/index.html"
                ),

                categories: resolve(
                    import.meta.dirname,
                    "src/categories/index.html"
                ),

                search: resolve(
                    import.meta.dirname,
                    "src/search/index.html"
                ),

                favorites: resolve(
                    import.meta.dirname,
                    "src/favorites/index.html"
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
                )

            }

        }

    }

}));
