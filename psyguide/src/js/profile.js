// =========================================================
// PsyGuide Profile
// =========================================================


// =========================================================
// STORAGE KEY
// =========================================================

const PROFILE_STORAGE_KEY = "psyguideProfile";


// =========================================================
// ELEMENTS
// =========================================================

const profileForm =
    document.getElementById("profileForm");

const profileName =
    document.getElementById("profileName");

const profileMessage =
    document.getElementById("profileMessage");


// =========================================================
// LOAD SAVED PROFILE
// =========================================================

function loadProfile() {

    const savedProfile =
        localStorage.getItem(
            PROFILE_STORAGE_KEY
        );


    if (!savedProfile) {

        return;

    }


    try {

        const profile =
            JSON.parse(savedProfile);


        if (profile.name) {

            profileName.value =
                profile.name;

        }

    } catch (error) {

        console.error(
            "Unable to load profile:",
            error
        );

    }

}


// =========================================================
// SAVE PROFILE
// =========================================================

function saveProfile(event) {

    event.preventDefault();


    const name =
        profileName.value.trim();


    // Validate name

    if (!name) {

        profileMessage.textContent =
            "Please enter your name.";

        profileMessage.classList.add(
            "error"
        );

        return;

    }


    // Create profile object

    const profile = {

        name: name,

        updatedAt:
            new Date().toISOString()

    };


    // Save to Local Storage

    localStorage.setItem(

        PROFILE_STORAGE_KEY,

        JSON.stringify(profile)

    );


    // Display success message

    profileMessage.textContent =
        "Your profile has been saved successfully.";

    profileMessage.classList.remove(
        "error"
    );

    profileMessage.classList.add(
        "success"
    );

}


// =========================================================
// FORM EVENT
// =========================================================

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        saveProfile
    );

}


// =========================================================
// INITIALIZE
// =========================================================

loadProfile();