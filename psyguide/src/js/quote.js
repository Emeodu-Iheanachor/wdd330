

// =========================================================
// PsyGuide Quote API
// =========================================================

const quoteText =
    document.querySelector("#quoteText");

const quoteAuthor =
    document.querySelector("#quoteAuthor");

const newQuoteBtn =
    document.querySelector("#newQuoteBtn");


// =========================================================
// API URL
// =========================================================

const QUOTE_API =
    "https://dummyjson.com/quotes/random";


// =========================================================
// GET RANDOM QUOTE
// =========================================================

async function getRandomQuote() {

    if (!quoteText || !quoteAuthor) {
        return;
    }

    quoteText.textContent =
        "Loading today's inspiration...";

    quoteAuthor.textContent = "";


    try {

        const response =
            await fetch(QUOTE_API);


        if (!response.ok) {

            throw new Error(
                `Quote API error: ${response.status}`
            );

        }


        const data =
            await response.json();


        quoteText.textContent =
            `"${data.quote}"`;


        quoteAuthor.textContent =
            `— ${data.author}`;


    } catch (error) {

        console.error(
            "Quote API error:",
            error
        );


        quoteText.textContent =
            "Take a moment to breathe, reflect, and care for yourself today.";


        quoteAuthor.textContent =
            "PsyGuide";


    }

}


// =========================================================
// NEW QUOTE BUTTON
// =========================================================

if (newQuoteBtn) {

    newQuoteBtn.addEventListener(
        "click",
        getRandomQuote
    );

}


// =========================================================
// INITIAL QUOTE
// =========================================================

getRandomQuote();