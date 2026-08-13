// =========================================================
// PsyGuide Search Data
// =========================================================

// =========================================================
// VITE BASE URL
// =========================================================

const baseURL = import.meta.env.BASE_URL;


// =========================================================
// SEARCH DATA CLASS
// =========================================================

export default class SearchData {

    constructor() {

        this.topics = [];

        this.loaded = false;

    }


    // =====================================================
    // NORMALIZE TEXT
    // =====================================================

    normalizeText(text) {

        return String(text || "")
            .toLowerCase()
            .replace(/&/g, " and ")
            .replace(/[^\w\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    }


    // =====================================================
    // LOAD TOPICS
    // =====================================================

    async loadTopics() {

        if (this.loaded) {

            return this.topics;

        }

        try {

            const response =
                await fetch(
                    `${baseURL}data/topics.json`
                );

            if (!response.ok) {

                throw new Error(
                    `Unable to load topics: ${response.status}`
                );

            }

            const data =
                await response.json();

            if (!Array.isArray(data)) {

                throw new Error(
                    "topics.json must contain an array."
                );

            }

            this.topics = data;

            this.loaded = true;

            return this.topics;

        } catch (error) {

            console.error(
                "PsyGuide topic loading error:",
                error
            );

            this.topics = [];

            throw error;

        }

    }


    // =====================================================
    // GET SEARCHABLE TEXT
    // =====================================================

    getSearchableText(topic) {

        const searchableValues = [

            topic.id,
            topic.category,
            topic.title,
            topic.description,
            topic.definition,
            topic.symptoms,
            topic.causes,
            topic.treatment,
            topic.prevention,
            topic.resources,
            topic.keywords,
            topic.tags,
            topic.synonyms

        ];

        return this.normalizeText(

            searchableValues
                .flat(Infinity)
                .filter(Boolean)
                .join(" ")

        );

    }


    // =====================================================
    // SEARCH SCORE
    // =====================================================

    getSearchScore(topic, query) {

        const normalizedQuery =
            this.normalizeText(query);

        if (!normalizedQuery) {

            return 0;

        }

        const title =
            this.normalizeText(topic.title);

        const category =
            this.normalizeText(topic.category);

        const description =
            this.normalizeText(topic.description);

        const definition =
            this.normalizeText(topic.definition);

        const searchableText =
            this.getSearchableText(topic);

        let score = 0;


        // Exact title

        if (title === normalizedQuery) {

            score += 100;

        }


        // Title starts with query

        else if (
            title.startsWith(normalizedQuery)
        ) {

            score += 80;

        }


        // Title contains query

        else if (
            title.includes(normalizedQuery)
        ) {

            score += 60;

        }


        // Category

        if (
            category.includes(normalizedQuery)
        ) {

            score += 45;

        }


        // Description

        if (
            description.includes(normalizedQuery)
        ) {

            score += 30;

        }


        // Definition

        if (
            definition.includes(normalizedQuery)
        ) {

            score += 25;

        }


        // Other topic information

        if (
            searchableText.includes(normalizedQuery)
        ) {

            score += 20;

        }


        // Individual words

        const queryWords =
            normalizedQuery
                .split(" ")
                .filter(word => word.length > 1);


        queryWords.forEach(word => {

            if (
                searchableText.includes(word)
            ) {

                score += 5;

            }

        });


        return score;

    }


    // =====================================================
    // SEARCH TOPICS
    // =====================================================

    async search(query) {

        const topics =
            await this.loadTopics();

        const normalizedQuery =
            this.normalizeText(query);

        if (!normalizedQuery) {

            return [];

        }

        return topics

            .map(topic => ({

                topic,

                score:
                    this.getSearchScore(
                        topic,
                        normalizedQuery
                    )

            }))

            .filter(result =>
                result.score > 0
            )

            .sort(
                (a, b) =>
                    b.score - a.score
            )

            .map(result =>
                result.topic
            );

    }


    // =====================================================
    // SEARCH SUGGESTIONS
    // =====================================================

    async getSuggestions(query) {

        const results =
            await this.search(query);

        return results.slice(0, 6);

    }

}