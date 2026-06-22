/*
|--------------------------------------------------------------------------
| SGS E-COM — HOME PAGE SCRIPT
|--------------------------------------------------------------------------
|
| File: home.js
| Page: index.html
|
| Concepts Demonstrated:
|   ✓ Fetch API
|   ✓ Async / Await
|   ✓ Try / Catch / Finally
|   ✓ Array filter()
|   ✓ Array sort()
|   ✓ Array map()
|   ✓ Spread Operator (...)
|   ✓ Set (unique values)
|   ✓ DOM Manipulation
|   ✓ Event Listeners
|   ✓ Template Literals
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| GLOBAL VARIABLES
|--------------------------------------------------------------------------
|
| allProducts     → stores all products fetched from API
| filteredProducts → stores filtered/sorted subset
|
*/

let allProducts     = [];
let filteredProducts = [];


/*
|--------------------------------------------------------------------------
| PAGE LOAD FLOW
|--------------------------------------------------------------------------
|
|  DOMContentLoaded → init()
|       ↓
|  loadProducts()  — fetch from PRODUCTS_API
|       ↓
|  renderProducts() — build HTML cards
|       ↓
|  loadCategories() — populate select dropdown
|       ↓
|  setupEvents()   — attach event listeners
|
*/

document.addEventListener(
    "DOMContentLoaded",
    init
);


/*
|--------------------------------------------------------------------------
| INIT APPLICATION
|--------------------------------------------------------------------------
*/

async function init() {

    console.log("SGS E-COM | Home Page Initialized");

    // Load products and users for hero stats at same time
    await Promise.all([
        loadProducts(),
        loadHeroStats()
    ]);

    setupEvents();
}


/*
|--------------------------------------------------------------------------
| LOAD HERO STATS
|--------------------------------------------------------------------------
|
| Fetches both APIs concurrently using Promise.all()
| Updates hero stat counters
|
*/

async function loadHeroStats() {

    try {

        const [productsRes, usersRes] = await Promise.all([
            fetch(PRODUCTS_API),
            fetch(USERS_API)
        ]);

        const products = await productsRes.json();
        const users    = await usersRes.json();

        // Update hero stat numbers
        const heroProductCount = document.getElementById("heroProductCount");
        const heroUserCount    = document.getElementById("heroUserCount");

        if (heroProductCount) heroProductCount.textContent = products.length;
        if (heroUserCount)    heroUserCount.textContent    = users.length;

    }
    catch (error) {
        console.warn("Hero stats load failed", error);
    }

}


/*
|--------------------------------------------------------------------------
| FETCH PRODUCTS FROM MOCK API
|--------------------------------------------------------------------------
|
| API → PRODUCTS_API
| URL → https://6a37dac9c105017aa6395e79.mockapi.io/api/v1/products
|
| Step 1: showLoader()
| Step 2: fetch(PRODUCTS_API)
| Step 3: response.json()
| Step 4: store in allProducts
| Step 5: renderProducts()
| Step 6: loadCategories()
| Step 7: updateProductCount()
| Step 8: hideLoader()
|
*/

async function loadProducts() {

    try {

        showLoader();

        /*
        |-----------------------------------------------------------------
        | FETCH REQUEST
        |-----------------------------------------------------------------
        */
        const response = await fetch(PRODUCTS_API);

        /*
        |-----------------------------------------------------------------
        | CHECK RESPONSE STATUS
        |-----------------------------------------------------------------
        */
        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        /*
        |-----------------------------------------------------------------
        | PARSE JSON DATA
        |-----------------------------------------------------------------
        */
        const data = await response.json();

        /*
        |-----------------------------------------------------------------
        | STORE IN MEMORY
        |-----------------------------------------------------------------
        */
        allProducts      = data;
        filteredProducts = [...allProducts]; // spread copy

        /*
        |-----------------------------------------------------------------
        | RENDER UI
        |-----------------------------------------------------------------
        */
        renderProducts(filteredProducts);
        loadCategories();
        updateProductCount();

        console.log(
            `✓ ${allProducts.length} products loaded`
        );

    }
    catch (error) {

        console.error("❌ Failed to load products:", error);
        showError("Unable to load products. Please check your connection.");

    }
    finally {

        // always hide loader (success OR error)
        hideLoader();

    }

}


/*
|--------------------------------------------------------------------------
| RENDER PRODUCTS
|--------------------------------------------------------------------------
|
| Builds product card HTML for each product
| Uses Template Literals (backticks)
|
*/

function renderProducts(products) {

    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    /*
    |-----------------------------------------------------------------
    | EMPTY STATE
    |-----------------------------------------------------------------
    */
    if (products.length === 0) {

        container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
            <div class="empty-icon">🔍</div>
            <h3>No Products Found</h3>
            <p>Try changing your search or filter options</p>
        </div>
        `;

        return;
    }

    /*
    |-----------------------------------------------------------------
    | BUILD CARDS WITH forEach()
    |-----------------------------------------------------------------
    */
    products.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <div class="product-card-img-wrap">
                <img
                    class="product-card-img"
                    src="${product.image}"
                    alt="${product.title}"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/300x220/161829/6366f1?text=No+Image'"
                >
            </div>

            <div class="product-card-body">

                <span class="product-category-badge">
                    ${product.category}
                </span>

                <h3 class="product-title">
                    ${product.title}
                </h3>

                <div class="product-price">
                    ₹${Number(product.price).toLocaleString('en-IN')}
                    <span>/ unit</span>
                </div>

                <button
                    class="view-btn"
                    onclick="viewProduct('${product.id}')"
                >
                    View Details →
                </button>

            </div>

        </div>

        `;

    });

}


/*
|--------------------------------------------------------------------------
| LOAD CATEGORIES INTO DROPDOWN
|--------------------------------------------------------------------------
|
| Uses:
|   Array.map()      → extract categories
|   new Set()        → remove duplicates
|   Spread [...]     → convert Set to Array
|   forEach()        → build <option> elements
|
*/

function loadCategories() {

    const categorySelect =
        document.getElementById("categoryFilter");

    /*
    |-----------------------------------------------------------------
    | EXTRACT UNIQUE CATEGORIES
    |-----------------------------------------------------------------
    */
    const categories = [
        ...new Set(
            allProducts.map(
                product => product.category
            )
        )
    ];

    /*
    |-----------------------------------------------------------------
    | BUILD OPTIONS
    |-----------------------------------------------------------------
    */
    categories.forEach(category => {

        categorySelect.innerHTML += `
        <option value="${category}">
            📁 ${category}
        </option>
        `;

    });

}


/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT COUNT BADGE
|--------------------------------------------------------------------------
*/

function updateProductCount() {

    const countEl = document.getElementById("productCount");

    if (!countEl) return;

    countEl.textContent =
        `${filteredProducts.length} Products`;

}


/*
|--------------------------------------------------------------------------
| SETUP EVENT LISTENERS
|--------------------------------------------------------------------------
|
| Attaches listeners to:
|   #searchInput    → "input"  event
|   #categoryFilter → "change" event
|   #sortPrice      → "change" event
|
*/

function setupEvents() {

    /*
    |-----------------------------------------------------------------
    | SEARCH INPUT → fires on every keystroke
    |-----------------------------------------------------------------
    */
    document
        .getElementById("searchInput")
        .addEventListener("input", filterProducts);

    /*
    |-----------------------------------------------------------------
    | CATEGORY FILTER → fires on dropdown change
    |-----------------------------------------------------------------
    */
    document
        .getElementById("categoryFilter")
        .addEventListener("change", filterProducts);

    /*
    |-----------------------------------------------------------------
    | PRICE SORT → fires on dropdown change
    |-----------------------------------------------------------------
    */
    document
        .getElementById("sortPrice")
        .addEventListener("change", filterProducts);

}


/*
|--------------------------------------------------------------------------
| SEARCH + FILTER + SORT (COMBINED)
|--------------------------------------------------------------------------
|
| Called whenever:
|   - User types in search box
|   - User changes category
|   - User changes sort order
|
| Flow:
|   1. Start with ALL products (copy with spread)
|   2. Apply SEARCH filter
|   3. Apply CATEGORY filter
|   4. Apply SORT order
|   5. Render updated results
|
*/

function filterProducts() {

    /*
    |-----------------------------------------------------------------
    | START WITH FULL COPY
    |-----------------------------------------------------------------
    */
    let products = [...allProducts];

    /*
    |-----------------------------------------------------------------
    | GET FILTER VALUES
    |-----------------------------------------------------------------
    */
    const searchValue =
        document.getElementById("searchInput")
            .value.toLowerCase().trim();

    const categoryValue =
        document.getElementById("categoryFilter")
            .value;

    const sortValue =
        document.getElementById("sortPrice")
            .value;

    /*
    |-----------------------------------------------------------------
    | STEP 1: SEARCH FILTER
    | Uses Array.filter() + String.includes()
    |-----------------------------------------------------------------
    */
    if (searchValue) {

        products = products.filter(product =>

            product.title
                .toLowerCase()
                .includes(searchValue)

            ||

            product.category
                .toLowerCase()
                .includes(searchValue)

        );

    }

    /*
    |-----------------------------------------------------------------
    | STEP 2: CATEGORY FILTER
    | Uses Array.filter() + strict equality
    |-----------------------------------------------------------------
    */
    if (categoryValue) {

        products = products.filter(product =>
            product.category === categoryValue
        );

    }

    /*
    |-----------------------------------------------------------------
    | STEP 3: PRICE SORTING
    | Uses Array.sort() with compare function
    |-----------------------------------------------------------------
    */
    if (sortValue === "low") {

        products.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );

    }

    if (sortValue === "high") {

        products.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );

    }

    /*
    |-----------------------------------------------------------------
    | STORE AND RENDER
    |-----------------------------------------------------------------
    */
    filteredProducts = products;

    renderProducts(filteredProducts);
    updateProductCount();

}


/*
|--------------------------------------------------------------------------
| NAVIGATE TO PRODUCT DETAILS
|--------------------------------------------------------------------------
|
| Redirects to: product-details.html?id=1
| The ?id=1 is a URL Query Parameter
|
*/

function viewProduct(id) {

    window.location.href = `product-details.html?id=${id}`;

}


/*
|--------------------------------------------------------------------------
| LOADER — SHOW / HIDE
|--------------------------------------------------------------------------
*/

function showLoader() {

    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";

}

function hideLoader() {

    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";

}


/*
|--------------------------------------------------------------------------
| ERROR MESSAGE
|--------------------------------------------------------------------------
*/

function showError(message) {

    const container = document.getElementById("productsContainer");

    container.innerHTML = `
    <div class="error-state" style="grid-column:1/-1;">
        <div class="error-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>${message}</p>
        <button
            class="btn btn-primary"
            style="margin-top:20px;"
            onclick="loadProducts()"
        >
            🔄 Try Again
        </button>
    </div>
    `;

}


/*
|--------------------------------------------------------------------------
| APPLICATION FLOW SUMMARY
|--------------------------------------------------------------------------
|
|  PAGE LOAD
|       ↓
|  init()
|       ↓
|  loadProducts() ──── fetch(PRODUCTS_API) ──── MOCK API
|       ↓                                            ↓
|  store in allProducts                        returns JSON array
|       ↓
|  renderProducts()   ← build HTML cards
|       ↓
|  loadCategories()   ← populate dropdown
|       ↓
|  setupEvents()      ← attach listeners
|       ↓
|  [User Interaction]
|       ↓
|  filterProducts()   ← search + filter + sort
|       ↓
|  renderProducts()   ← re-render results
|
|--------------------------------------------------------------------------
*/
