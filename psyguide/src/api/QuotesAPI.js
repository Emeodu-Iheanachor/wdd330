// =========================================
// Quotes API
// =========================================

export default class QuotesAPI {

    constructor() {

        this.baseURL =
            "https://zenquotes.io/api";

        // Counselling and wellness-focused
        // fallback quotes.
        this.fallbackQuotes = [

            {
                content:
                    "You do not have to face every challenge alone. Seeking support is a sign of strength.",
                author:
                    "PsyGuide"
            },

            {
                content:
                    "Healing begins when we allow ourselves to acknowledge what we are feeling.",
                author:
                    "PsyGuide"
            },

            {
                content:
                    "Be patient with yourself. Personal growth takes time, understanding, and compassion.",
                author:
                    "PsyGuide"
            },

            {
                content:
                    "Talking about your feelings can be an important step toward understanding yourself.",
                author:
                    "PsyGuide"
            },

            {
                content:
                    "Your feelings are worth acknowledging, and your wellbeing is worth protecting.",
                author:
                    "PsyGuide"
            },

            {
                content:
                    "Self-compassion allows us to recognize our struggles without losing sight of our strengths.",
                author:
                    "PsyGuide"
            },

            {
                content:
                    "Small steps toward positive change can lead to meaningful personal growth.",
                author:
                    "PsyGuide"
            },

            {
                content:
                    "Taking time to understand yourself can help you make healthier choices.",
                author:
                    "PsyGuide"
            }

        ];

        this.lastIndex = -1;
    }


    // =========================================
    // Get Random Quote
    // =========================================

    async getRandomQuote() {

        try {

            const response =
                await fetch(
                    `${this.baseURL}/random`
                );


            if (!response.ok) {

                throw new Error(
                    `Quote request failed: ${response.status}`
                );

            }


            const data =
                await response.json();


            if (
                Array.isArray(data) &&
                data.length > 0 &&
                data[0].q &&
                data[0].a
            ) {

                return {

                    content:
                        data[0].q,

                    author:
                        data[0].a

                };

            }


            throw new Error(
                "Invalid quote response."
            );


        } catch (error) {

            console.error(
                "QuotesAPI:",
                error
            );


            return this.getFallbackQuote();

        }

    }


    // =========================================
    // Get Counselling Fallback Quote
    // =========================================

    getFallbackQuote() {

        let randomIndex;


        do {

            randomIndex =
                Math.floor(
                    Math.random() *
                    this.fallbackQuotes.length
                );

        } while (
            randomIndex === this.lastIndex &&
            this.fallbackQuotes.length > 1
        );


        this.lastIndex =
            randomIndex;


        return this.fallbackQuotes[
            randomIndex
        ];

    }

}
