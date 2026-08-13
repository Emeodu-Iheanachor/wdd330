// =========================================
// PsyGuide Dynamic Hero Image Slider
// Vite + GitHub Pages + Render
// =========================================

const baseURL = import.meta.env.BASE_URL;

const heroImage = document.querySelector("#heroImage");


// =========================================
// Hero Images
// =========================================

const heroImages = [

    {
        src: `${baseURL}images/hero-1.jpg`,
        alt: "Person relaxing in a peaceful environment"
    },

    {
        src: `${baseURL}images/hero-2.jpg`,
        alt: "Person practicing meditation"
    },

    {
        src: `${baseURL}images/hero-3.jpg`,
        alt: "Peaceful nature representing mental wellness"
    },

    {
        src: `${baseURL}images/hero-4.jpg`,
        alt: "Person enjoying a calm outdoor environment"
    },

    {
        src: `${baseURL}images/hero-5.jpg`,
        alt: "Person taking time to relax"
    },

    {
        src: `${baseURL}images/hero-6.jpg`,
        alt: "Peaceful environment supporting emotional wellbeing"
    },

    {
        src: `${baseURL}images/hero-7.jpg`,
        alt: "Person practicing healthy wellness habits"
    },

    {
        src: `${baseURL}images/hero-8.jpg`,
        alt: "Calm environment promoting mental wellness"
    },

    {
        src: `${baseURL}images/hero-9.jpg`,
        alt: "Person enjoying a peaceful moment"
    },

    {
        src: `${baseURL}images/hero-10.jpg`,
        alt: "Healthy lifestyle supporting emotional wellbeing"
    },

    {
        src: `${baseURL}images/hero-11.jpg`,
        alt: "Peaceful wellness environment"
    }

];


// =========================================
// Slider Settings
// =========================================

const displayTime = 5000;
const transitionTime = 1200;


// =========================================
// Current Image
// =========================================

let currentImage = 0;


// =========================================
// Preload Images
// =========================================

heroImages.forEach((image) => {

    const preloadImage = new Image();

    preloadImage.src = image.src;

});


// =========================================
// Display First Image
// =========================================

function displayInitialImage() {

    if (!heroImage || heroImages.length === 0) {
        return;
    }

    heroImage.src = heroImages[0].src;

    heroImage.alt = heroImages[0].alt;

}


// =========================================
// Change Hero Image
// =========================================

function changeHeroImage() {

    if (!heroImage || heroImages.length <= 1) {
        return;
    }


    // Start fade-out animation

    heroImage.classList.add("fade-out");


    // Wait for fade-out to finish

    setTimeout(() => {

        // Move to next image

        currentImage =
            (currentImage + 1) %
            heroImages.length;


        // Change image

        heroImage.src =
            heroImages[currentImage].src;


        // Change accessibility text

        heroImage.alt =
            heroImages[currentImage].alt;


        // Restart animation

        heroImage.classList.remove("fade-out");

    }, transitionTime);

}


// =========================================
// Start Hero Slider
// =========================================

if (
    heroImage &&
    heroImages.length > 0
) {

    displayInitialImage();


    setInterval(
        changeHeroImage,
        displayTime
    );

}
