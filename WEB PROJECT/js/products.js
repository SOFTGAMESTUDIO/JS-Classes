/*
|--------------------------------------------------------------------------
| SGS E-COM — PRODUCTS PAGE SCRIPT
|--------------------------------------------------------------------------
|
| File: products.js
| Pages: product.html  →  renderProducts()
|        product-details.html  →  loadProductDetails()
|
| Concepts Demonstrated:
|   ✓ Fetch API
|   ✓ Async / Await
|   ✓ Try / Catch / Finally
|   ✓ URLSearchParams  (product-details page)
|   ✓ Array filter()
|   ✓ Array sort()
|   ✓ Array find()     (product-details page)
|   ✓ Template Literals
|   ✓ DOM Manipulation
|   ✓ Event Listeners
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| GLOBAL STATE
|--------------------------------------------------------------------------
*/

let allProducts      = [];
let filteredProducts = [];
let currentProducts  = []; // for table search on admin usage


/*
|--------------------------------------------------------------------------
| DETECT WHICH PAGE WE'RE ON
|--------------------------------------------------------------------------
|
| Both product.html and product-details.html use products.js
| We detect which one by checking the URL filename
|
*/

document.addEventListener("DOMContentLoaded", function () {

    const page = window.location.pathname;

    if (page.includes("product-details")) {

        /*
        |-----------------------------------------------------------------
        | PRODUCT DETAILS PAGE
        |-----------------------------------------------------------------
        */
        console.log("SGS E-COM | Product Details Page");
        initDetailsPage();

    } else {

        /*
        |-----------------------------------------------------------------
        | PRODUCTS LIST PAGE
        |-----------------------------------------------------------------
        */
        console.log("SGS E-COM | Products List Page");
        initProductsPage();

    }

});


/* ============================================================
   PRODUCTS LIST PAGE (product.html)
============================================================ */

/*
|--------------------------------------------------------------------------
| INIT — PRODUCTS LIST
|--------------------------------------------------------------------------
*/

async function initProductsPage() {

    await loadProducts();
    setupEvents();

}


/*
|--------------------------------------------------------------------------
| FETCH ALL PRODUCTS
|--------------------------------------------------------------------------
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

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        /*
        |-----------------------------------------------------------------
        | PARSE JSON
        |-----------------------------------------------------------------
        */
        const data = await response.json();

        allProducts      = data;
        filteredProducts = [...allProducts];

        /*
        |-----------------------------------------------------------------
        | RENDER
        |-----------------------------------------------------------------
        */
        renderProducts(filteredProducts);
        loadCategories();
        updateCount();

        console.log(`✓ ${allProducts.length} products loaded`);

    }
    catch (error) {

        console.error("❌ Error:", error);

        document.getElementById("productsContainer").innerHTML = `
        <div class="error-state" style="grid-column:1/-1;">
            <div class="error-icon">⚠️</div>
            <h3>Failed to load products</h3>
            <p>${error.message}</p>
            <button class="btn btn-primary" style="margin-top:20px;" onclick="loadProducts()">
                🔄 Try Again
            </button>
        </div>
        `;

    }
    finally {

        hideLoader();

    }

}


/*
|--------------------------------------------------------------------------
| RENDER PRODUCTS — Products List Page
|--------------------------------------------------------------------------
*/

function renderProducts(products) {

    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
            <div class="empty-icon">🔍</div>
            <h3>No Products Found</h3>
            <p>Try different search or filter options</p>
        </div>
        `;

        return;
    }

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
| LOAD CATEGORIES — Products List Page
|--------------------------------------------------------------------------
|
| Extract unique categories from allProducts
| Uses: map() + Set + spread [...]
|
*/

function loadCategories() {

    const select = document.getElementById("categoryFilter");

    const categories = [
        ...new Set(
            allProducts.map(p => p.category)
        )
    ];

    categories.forEach(category => {

        select.innerHTML += `
        <option value="${category}">
            📁 ${category}
        </option>
        `;

    });

}


/*
|--------------------------------------------------------------------------
| FILTER PRODUCTS — Products List Page
|--------------------------------------------------------------------------
|
| Applies: Search → Category → Sort
|
*/

function filterProducts() {

    let products = [...allProducts];

    const search =
        document.getElementById("searchInput")
            .value.toLowerCase().trim();

    const category =
        document.getElementById("categoryFilter")
            .value;

    const sort =
        document.getElementById("sortPrice")
            .value;

    /* SEARCH */
    if (search) {
        products = products.filter(p =>
            p.title.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)
        );
    }

    /* CATEGORY */
    if (category) {
        products = products.filter(p => p.category === category);
    }

    /* SORT */
    if (sort === "low") {
        products.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sort === "high") {
        products.sort((a, b) => Number(b.price) - Number(a.price));
    }

    filteredProducts = products;

    renderProducts(filteredProducts);
    updateCount();

}


/*
|--------------------------------------------------------------------------
| UPDATE COUNT — Products List Page
|--------------------------------------------------------------------------
*/

function updateCount() {

    const countEl = document.getElementById("productCount");

    if (countEl) {
        countEl.textContent = `${filteredProducts.length} Products`;
    }

}


/*
|--------------------------------------------------------------------------
| SETUP EVENTS — Products List Page
|--------------------------------------------------------------------------
*/

function setupEvents() {

    const searchInput    = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortPrice      = document.getElementById("sortPrice");

    if (searchInput)    searchInput.addEventListener("input",  filterProducts);
    if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
    if (sortPrice)      sortPrice.addEventListener("change",   filterProducts);

}


/*
|--------------------------------------------------------------------------
| VIEW PRODUCT — Navigate to details page
|--------------------------------------------------------------------------
|
| Redirects to: product-details.html?id=5
|
*/

function viewProduct(id) {

    window.location.href = `product-details.html?id=${id}`;

}


/*
|--------------------------------------------------------------------------
| LOADER — Products List Page
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


/* ============================================================
   PRODUCT DETAILS PAGE (product-details.html)
============================================================ */

/*
|--------------------------------------------------------------------------
| INIT — PRODUCT DETAILS PAGE
|--------------------------------------------------------------------------
|
| Steps:
|   1. Read ?id= from URL using URLSearchParams
|   2. Fetch that specific product
|   3. Display product details
|   4. Load related products (same category)
|
*/

async function initDetailsPage() {

    /*
    |-----------------------------------------------------------------
    | STEP 1: READ URL PARAMETER
    |-----------------------------------------------------------------
    |
    | URL example: product-details.html?id=5
    | window.location.search → "?id=5"
    | new URLSearchParams()  → parses query string
    | .get("id")             → returns "5"
    |
    */

    const params    = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    // No ID in URL → show error
    if (!productId) {
        showDetailsError();
        return;
    }

    await loadProductDetails(productId);

}


/*
|--------------------------------------------------------------------------
| FETCH PRODUCT DETAILS
|--------------------------------------------------------------------------
|
| Uses: fetch(PRODUCTS_API + "/" + id) OR fetch all + find()
|
*/

async function loadProductDetails(id) {

    try {

        showLoader();

        /*
        |-----------------------------------------------------------------
        | Fetch ALL products then use Array.find()
        | This lets us show related products too
        |-----------------------------------------------------------------
        */
        const response = await fetch(PRODUCTS_API);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        /*
        |-----------------------------------------------------------------
        | Array.find() — locate the product by ID
        |-----------------------------------------------------------------
        */
        const product = products.find(p => p.id === id);

        if (!product) {
            throw new Error("Product not found");
        }

        // Render product details
        renderProductDetails(product);

        // Load related products (same category)
        const related = products.filter(
            p => p.category === product.category && p.id !== id
        );

        renderRelated(related.slice(0, 4));

    }
    catch (error) {

        console.error("❌ Product details error:", error);
        showDetailsError();

    }
    finally {

        hideLoader();

    }

}


/*
|--------------------------------------------------------------------------
| RENDER PRODUCT DETAILS
|--------------------------------------------------------------------------
*/

function renderProductDetails(product) {

    // Show the details container
    const detailsEl = document.getElementById("productDetails");
    if (detailsEl) detailsEl.style.display = "grid";

    // Populate fields
    const safe = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    document.getElementById("productImage").src = product.image;
    document.getElementById("productImage").alt = product.title;

    safe("productId",     `Product #${product.id}`);
    safe("productTitle",  product.title);
    safe("categoryText",  product.category);
    safe("categoryBadge", product.category);
    safe("productPrice",  `₹${Number(product.price).toLocaleString('en-IN')}`);
    safe("productDesc",   product.description || "No description available for this product.");
    safe("productDate",   new Date(product.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    }));
    safe("productIdMeta", `#${product.id}`);

    // Update page title
    document.title = `${product.title} | SGS E-COM`;

}


/*
|--------------------------------------------------------------------------
| RENDER RELATED PRODUCTS
|--------------------------------------------------------------------------
*/

function renderRelated(products) {

    const section   = document.getElementById("relatedSection");
    const container = document.getElementById("relatedProducts");

    if (!section || !container || products.length === 0) return;

    section.style.display = "block";

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
| SHOW DETAILS ERROR
|--------------------------------------------------------------------------
*/

function showDetailsError() {

    hideLoader();

    const errorEl = document.getElementById("errorState");
    if (errorEl) errorEl.style.display = "block";

    const detailsEl = document.getElementById("productDetails");
    if (detailsEl) detailsEl.style.display = "none";

}


/*
|--------------------------------------------------------------------------
| BUY NOW (placeholder)
|--------------------------------------------------------------------------
*/

function buyNow() {

    showToast("🛒 Added to cart! (Cart feature coming soon)", "success");

}


/*
|--------------------------------------------------------------------------
| ADD TO WISHLIST (placeholder)
|--------------------------------------------------------------------------
*/

function addToWishlist() {

    showToast("♡ Added to wishlist!", "info");

}


/*
|--------------------------------------------------------------------------
| TOAST NOTIFICATION
|--------------------------------------------------------------------------
*/

function showToast(message, type = "info") {

    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "toastOut 0.3s ease forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3000);

}
