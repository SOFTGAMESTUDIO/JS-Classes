/*
|--------------------------------------------------------------------------
| SGS E-COM — PROFILE PAGE SCRIPT
|--------------------------------------------------------------------------
|
| File: profile.js
| Page: profile.html
|
| Concepts Demonstrated:
|   ✓ Fetch API (fetch by specific ID)
|   ✓ Async / Await
|   ✓ Try / Catch / Finally
|   ✓ Form Validation
|   ✓ Error Handling
|   ✓ DOM Manipulation (show/hide elements)
|   ✓ Template Literals
|   ✓ Event Listeners (input, click, keypress)
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| PAGE LOAD
|--------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("SGS E-COM | Profile Page Initialized");

    setupProfileEvents();

});



/*
|--------------------------------------------------------------------------
| SETUP EVENTS
|--------------------------------------------------------------------------
|
| Allows pressing ENTER key to load profile
|
*/

function setupProfileEvents() {

    const input = document.getElementById("userId");

    if (input) {

        /*
        |-----------------------------------------------------------------
        | KEYPRESS EVENT
        | "keypress" fires when a key is pressed
        | event.key === "Enter" → user pressed Enter key
        |-----------------------------------------------------------------
        */
        input.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {
                loadUser();
            }

        });

    }

}


/*
|--------------------------------------------------------------------------
| LOAD USER BY ID
|--------------------------------------------------------------------------
|
| API Flow:
|
|   fetch(USERS_API / userId)
|   └── GET https://...mockapi.io/api/v1/users/5
|       ↓
|       response.ok? → parse JSON
|       ↓
|       displayProfile(user)
|
*/

async function loadUser() {

    /*
    |-----------------------------------------------------------------
    | STEP 1: GET AND VALIDATE INPUT
    |-----------------------------------------------------------------
    */
    const userId = document.getElementById("userId").value.trim();

    // Form validation
    if (!userId) {
        showProfileError("⚠️ Please enter a User ID");
        return;
    }

    if (Number(userId) < 1) {
        showProfileError("⚠️ User ID must be greater than 0");
        return;
    }

    // Clear previous error and hide profile
    hideProfileError();
    hideProfileCard();

    // Disable button while loading
    const btn = document.getElementById("loadBtn");
    if (btn) {
        btn.textContent = "Loading...";
        btn.disabled = true;
    }

    try {

        /*
        |-----------------------------------------------------------------
        | STEP 2: FETCH USER BY ID
        |
        | URL: USERS_API + "/" + userId
        | Example: .../users/5
        |-----------------------------------------------------------------
        */
        const response = await fetch(
            `${USERS_API}/${userId}`
        );

        /*
        |-----------------------------------------------------------------
        | STEP 3: CHECK RESPONSE
        |-----------------------------------------------------------------
        */
        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("User not found. Try a number between 1 and 100.");
            }

            throw new Error(`HTTP Error: ${response.status}`);

        }

        /*
        |-----------------------------------------------------------------
        | STEP 4: PARSE JSON
        |-----------------------------------------------------------------
        */
        const user = await response.json();

        /*
        |-----------------------------------------------------------------
        | STEP 5: DISPLAY PROFILE
        |-----------------------------------------------------------------
        */
        displayProfile(user);

        console.log("✓ User loaded:", user.name);

    }
    catch (error) {

        console.error("❌ Profile load failed:", error);

        showProfileError(error.message || "User not found");
        hideProfileCard();

    }
    finally {

        // Re-enable button
        if (btn) {
            btn.textContent = "Load Profile";
            btn.disabled = false;
        }

    }

}


/*
|--------------------------------------------------------------------------
| DISPLAY PROFILE
|--------------------------------------------------------------------------
|
| Populates all profile card fields with user data
| Shows the profile card
|
*/

function displayProfile(user) {

    /*
    |-----------------------------------------------------------------
    | SET AVATAR
    |-----------------------------------------------------------------
    */
    const avatar = document.getElementById("avatar");
    if (avatar) {
        avatar.src = user.avatar;
        avatar.alt = user.name;
        avatar.onerror = function () {
            this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=200`;
        };
    }

    /*
    |-----------------------------------------------------------------
    | SET TEXT FIELDS
    | Uses a helper function to safely set textContent
    |-----------------------------------------------------------------
    */
    const safe = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    safe("profileName",    user.name);
    safe("profileIdTag",   `ID: #${user.id}`);
    safe("profileEmail",   user.email);
    safe("profilePhone",   user.phone);
    safe("profileCity",    user.city);

    // Format the date nicely
    safe("profileCreated", new Date(user.createdAt).toLocaleDateString('en-IN', {
        year:  'numeric',
        month: 'long',
        day:   'numeric'
    }));

    // Show the profile card with animation
    showProfileCard();

}


/*
|--------------------------------------------------------------------------
| CLEAR PROFILE
|--------------------------------------------------------------------------
|
| Resets the page to its initial state
|
*/

function clearProfile() {

    hideProfileCard();
    hideProfileError();

    const input = document.getElementById("userId");
    if (input) {
        input.value = "";
        input.focus();
    }

}


/*
|--------------------------------------------------------------------------
| SHOW / HIDE PROFILE CARD
|--------------------------------------------------------------------------
*/

function showProfileCard() {

    const card = document.getElementById("profileCard");

    if (card) {
        card.classList.add("visible");
    }

}

function hideProfileCard() {

    const card = document.getElementById("profileCard");

    if (card) {
        card.classList.remove("visible");
    }

}


/*
|--------------------------------------------------------------------------
| SHOW / HIDE ERROR
|--------------------------------------------------------------------------
*/

function showProfileError(message) {

    const error   = document.getElementById("profileError");
    const errorTx = document.getElementById("errorText");

    if (error)   error.classList.add("visible");
    if (errorTx) errorTx.textContent = message;

}

function hideProfileError() {

    const error = document.getElementById("profileError");
    if (error) error.classList.remove("visible");

}
