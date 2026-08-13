const baseURL = import.meta.env.BASE_URL;

async function loadComponent(selector, path) {

    try {

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${path}: ${response.status}`
            );
        }

        const html = await response.text();

        const element =
            document.querySelector(selector);

        if (element) {
            element.innerHTML = html;
        }

    } catch (error) {

        console.error(
            "Component loading error:",
            error
        );

    }
}


// =========================================
// Load Footer
// =========================================

await loadComponent(
    "footer",
    `${baseURL}components/footer.html`
);


// =========================================
// Navigation
// =========================================

import "./navigation.js";



