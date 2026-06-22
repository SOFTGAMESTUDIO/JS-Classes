/*
|--------------------------------------------------------------------------
| SGS E-COM — ADMIN DASHBOARD SCRIPT
|--------------------------------------------------------------------------
|
| File: admin.js
| Page: admin.html
|
| Concepts Demonstrated:
|   ✓ Promise.all()        — fetch products & users simultaneously
|   ✓ Fetch GET            — read all products / users
|   ✓ Fetch DELETE         — remove product / user
|   ✓ Fetch PUT            — update product / user
|   ✓ JSON.stringify()     — convert object to JSON string
|   ✓ Array reduce()       — calculate average price
|   ✓ Array map()          — transform data
|   ✓ new Set()            — get unique categories
|   ✓ innerHTML            — build table rows dynamically
|   ✓ Modal show / hide    — form-based edit UI
|   ✓ DOM classList        — toggle active states
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| GLOBAL STATE
|--------------------------------------------------------------------------
*/

let allProducts = []; // cache all products
let allUsers    = []; // cache all users


/*
|--------------------------------------------------------------------------
| PAGE LOAD
|--------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", init);


/*
|--------------------------------------------------------------------------
| INIT ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/

async function init() {

    console.log("SGS E-COM | Admin Dashboard Initialized");

    // Load both APIs at the same time using Promise.all()
    await loadDashboard();

}


/*
|--------------------------------------------------------------------------
| LOAD DASHBOARD
|--------------------------------------------------------------------------
|
| Uses Promise.all() to run both fetch calls simultaneously
| Much faster than doing them one by one (await + await)
|
*/

async function loadDashboard() {

    try {

        /*
        |-----------------------------------------------------------------
        | PROMISE.ALL — Concurrent Fetch
        |-----------------------------------------------------------------
        |
        | Without Promise.all():
        |   await loadProducts(); // waits 500ms
        |   await loadUsers();    // waits another 500ms
        |   Total: ~1000ms
        |
        | With Promise.all():
        |   Both run at the same time
        |   Total: ~500ms (whichever takes longer)
        |
        */
        await Promise.all([
            loadProducts(),
            loadUsers()
        ]);

        updateStats();

    }
    catch (error) {

        console.error("❌ Dashboard load failed:", error);

    }

}


/*
|--------------------------------------------------------------------------
| REFRESH ALL — Button action
|--------------------------------------------------------------------------
*/

async function refreshAll() {

    await loadDashboard();
    showToast("🔄 Data refreshed!", "success");

}


/*
|--------------------------------------------------------------------------
| LOAD PRODUCTS
|--------------------------------------------------------------------------
|
| GET /products
|
*/

async function loadProducts() {

    try {

        /*
        |-----------------------------------------------------------------
        | FETCH GET — Read All Products
        |-----------------------------------------------------------------
        */
        const response = await fetch(PRODUCTS_API);
        const products = await response.json();

        // Store in global cache
        allProducts = products;

        // Update stat card
        const countEl = document.getElementById("productsCount");
        if (countEl) countEl.textContent = products.length;

        // Update sidebar badge
        const sidebarEl = document.getElementById("sidebarProductCount");
        if (sidebarEl) sidebarEl.textContent = products.length;

        // Render product table
        renderProductsTable(products);

    }
    catch (error) {

        console.error("❌ Products load failed:", error);

    }

}


/*
|--------------------------------------------------------------------------
| LOAD USERS
|--------------------------------------------------------------------------
|
| GET /users
|
*/

async function loadUsers() {

    try {

        /*
        |-----------------------------------------------------------------
        | FETCH GET — Read All Users
        |-----------------------------------------------------------------
        */
        const response = await fetch(USERS_API);
        const users    = await response.json();

        // Store in global cache
        allUsers = users;

        // Update stat card
        const countEl = document.getElementById("usersCount");
        if (countEl) countEl.textContent = users.length;

        // Update sidebar badge
        const sidebarEl = document.getElementById("sidebarUserCount");
        if (sidebarEl) sidebarEl.textContent = users.length;

        // Render users table
        renderUsersTable(users);

    }
    catch (error) {

        console.error("❌ Users load failed:", error);

    }

}


/*
|--------------------------------------------------------------------------
| UPDATE DASHBOARD STATS
|--------------------------------------------------------------------------
|
| Uses Array.reduce() to calculate average price
| Uses new Set() to count unique categories
|
*/

function updateStats() {

    if (allProducts.length === 0) return;

    /*
    |-----------------------------------------------------------------
    | AVERAGE PRICE with Array.reduce()
    |-----------------------------------------------------------------
    |
    | reduce(callback, initialValue)
    | accumulator + currentValue → running total
    | Divide by length → average
    |
    */
    const totalPrice = allProducts.reduce(
        (accumulator, product) =>
            accumulator + Number(product.price),
        0
    );

    const average = Math.round(totalPrice / allProducts.length);

    const avgEl = document.getElementById("avgPrice");
    if (avgEl) avgEl.textContent = `₹${average.toLocaleString('en-IN')}`;

    /*
    |-----------------------------------------------------------------
    | UNIQUE CATEGORIES with new Set()
    |-----------------------------------------------------------------
    */
    const categories = new Set(
        allProducts.map(p => p.category)
    );

    const catEl = document.getElementById("categoriesCount");
    if (catEl) catEl.textContent = categories.size;

    /*
    |-----------------------------------------------------------------
    | TABLE INFO LABELS
    |-----------------------------------------------------------------
    */
    const prodInfo = document.getElementById("productsTableInfo");
    if (prodInfo) prodInfo.textContent = `${allProducts.length} products in database`;

    const userInfo = document.getElementById("usersTableInfo");
    if (userInfo) userInfo.textContent = `${allUsers.length} users registered`;

    // Footer info
    const prodFooter = document.getElementById("productFooterInfo");
    if (prodFooter) prodFooter.textContent = `Showing ${allProducts.length} of ${allProducts.length} products`;

    const userFooter = document.getElementById("userFooterInfo");
    if (userFooter) userFooter.textContent = `Showing ${allUsers.length} of ${allUsers.length} users`;

}


/*
|--------------------------------------------------------------------------
| RENDER PRODUCTS TABLE
|--------------------------------------------------------------------------
*/

function renderProductsTable(products) {

    const tbody = document.getElementById("productsTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (products.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center; padding:40px; color:var(--text-muted);">
                No products found
            </td>
        </tr>
        `;
        return;

    }

    /*
    |-----------------------------------------------------------------
    | BUILD TABLE ROWS with forEach()
    |-----------------------------------------------------------------
    */
    products.forEach(product => {

        tbody.innerHTML += `

        <tr>

            <td>#${product.id}</td>

            <td>
                <img
                    class="table-img"
                    src="${product.image}"
                    alt="${product.title}"
                    onerror="this.src='https://via.placeholder.com/44/161829/6366f1?text=?'"
                >
            </td>

            <td class="table-name">${product.title}</td>

            <td>
                <span class="table-category">
                    ${product.category}
                </span>
            </td>

            <td class="table-price">
                ₹${Number(product.price).toLocaleString('en-IN')}
            </td>

            <td>
                <div class="table-actions">

                    <button
                        class="btn btn-outline btn-sm"
                        onclick="openEditProduct('${product.id}')"
                    >
                        ✏️ Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteProduct('${product.id}', '${product.title.replace(/'/g, "\\'")}')"
                    >
                        🗑️ Delete
                    </button>

                </div>
            </td>

        </tr>

        `;

    });

}


/*
|--------------------------------------------------------------------------
| RENDER USERS TABLE
|--------------------------------------------------------------------------
*/

function renderUsersTable(users) {

    const tbody = document.getElementById("usersTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (users.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center; padding:40px; color:var(--text-muted);">
                No users found
            </td>
        </tr>
        `;
        return;

    }

    users.forEach(user => {

        tbody.innerHTML += `

        <tr>

            <td>#${user.id}</td>

            <td>
                <img
                    class="table-avatar"
                    src="${user.avatar}"
                    alt="${user.name}"
                    onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=36'"
                >
            </td>

            <td class="table-name">${user.name}</td>

            <td>${user.email}</td>

            <td>${user.phone}</td>

            <td>${user.city}</td>

            <td>
                <div class="table-actions">

                    <button
                        class="btn btn-outline btn-sm"
                        onclick="openEditUser('${user.id}')"
                    >
                        ✏️ Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteUser('${user.id}', '${user.name.replace(/'/g, "\\'")}')"
                    >
                        🗑️ Delete
                    </button>

                </div>
            </td>

        </tr>

        `;

    });

}


/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
|
| DELETE /products/:id
|
| fetch(URL, {
|     method: "DELETE"
| })
|
*/

async function deleteProduct(id, title) {

    // Confirm before deleting
    const confirmDelete = confirm(
        `Are you sure you want to delete:\n"${title}"?`
    );

    if (!confirmDelete) return;

    try {

        showToast("🗑️ Deleting product...", "info");

        /*
        |-----------------------------------------------------------------
        | FETCH DELETE REQUEST
        |-----------------------------------------------------------------
        */
        const response = await fetch(
            `${PRODUCTS_API}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(`Delete failed: ${response.status}`);
        }

        showToast(`✅ Product deleted successfully`, "success");

        // Reload products from API
        await loadProducts();
        updateStats();

    }
    catch (error) {

        console.error("❌ Delete product error:", error);
        showToast("❌ Failed to delete product", "error");

    }

}


/*
|--------------------------------------------------------------------------
| DELETE USER
|--------------------------------------------------------------------------
|
| DELETE /users/:id
|
*/

async function deleteUser(id, name) {

    const confirmDelete = confirm(
        `Are you sure you want to delete user:\n"${name}"?`
    );

    if (!confirmDelete) return;

    try {

        showToast("🗑️ Deleting user...", "info");

        /*
        |-----------------------------------------------------------------
        | FETCH DELETE REQUEST
        |-----------------------------------------------------------------
        */
        const response = await fetch(
            `${USERS_API}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(`Delete failed: ${response.status}`);
        }

        showToast(`✅ User deleted successfully`, "success");

        await loadUsers();
        updateStats();

    }
    catch (error) {

        console.error("❌ Delete user error:", error);
        showToast("❌ Failed to delete user", "error");

    }

}


/*
|--------------------------------------------------------------------------
| OPEN EDIT PRODUCT MODAL
|--------------------------------------------------------------------------
|
| Finds the product from allProducts cache using Array.find()
| Populates the modal form fields
| Shows the modal
|
*/

function openEditProduct(id) {

    /*
    |-----------------------------------------------------------------
    | Array.find() — locate product in cached array
    |-----------------------------------------------------------------
    */
    const product = allProducts.find(p => p.id === id);

    if (!product) return;

    // Populate form fields
    document.getElementById("editProductId").value       = product.id;
    document.getElementById("editProductTitle").value    = product.title;
    document.getElementById("editProductPrice").value    = product.price;
    document.getElementById("editProductCategory").value = product.category;

    // Show modal
    openModal("editProductModal");

}


/*
|--------------------------------------------------------------------------
| OPEN EDIT USER MODAL
|--------------------------------------------------------------------------
*/

function openEditUser(id) {

    const user = allUsers.find(u => u.id === id);

    if (!user) return;

    document.getElementById("editUserId").value    = user.id;
    document.getElementById("editUserName").value  = user.name;
    document.getElementById("editUserEmail").value = user.email;
    document.getElementById("editUserPhone").value = user.phone;
    document.getElementById("editUserCity").value  = user.city;

    openModal("editUserModal");

}


/*
|--------------------------------------------------------------------------
| SAVE PRODUCT — PUT Request
|--------------------------------------------------------------------------
|
| PUT /products/:id
|
| fetch(URL, {
|     method:  "PUT",
|     headers: { "Content-Type": "application/json" },
|     body:    JSON.stringify({ title, price, category })
| })
|
*/

async function saveProduct() {

    const id       = document.getElementById("editProductId").value;
    const title    = document.getElementById("editProductTitle").value.trim();
    const price    = document.getElementById("editProductPrice").value;
    const category = document.getElementById("editProductCategory").value.trim();

    // Validation
    if (!title) {
        showToast("⚠️ Product title is required", "error");
        return;
    }

    if (!price || Number(price) < 0) {
        showToast("⚠️ Valid price is required", "error");
        return;
    }

    try {

        showToast("💾 Saving changes...", "info");

        /*
        |-----------------------------------------------------------------
        | FETCH PUT REQUEST
        |-----------------------------------------------------------------
        |
        | headers: Content-Type tells the server we're sending JSON
        | body:    JSON.stringify() converts JS object → JSON string
        |
        */
        const response = await fetch(
            `${PRODUCTS_API}/${id}`,
            {
                method:  "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title:    title,
                    price:    price,
                    category: category
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Update failed: ${response.status}`);
        }

        showToast("✅ Product updated successfully!", "success");

        closeModal("editProductModal");

        // Reload to show changes
        await loadProducts();
        updateStats();

    }
    catch (error) {

        console.error("❌ Save product error:", error);
        showToast("❌ Failed to update product", "error");

    }

}


/*
|--------------------------------------------------------------------------
| SAVE USER — PUT Request
|--------------------------------------------------------------------------
|
| PUT /users/:id
|
*/

async function saveUser() {

    const id    = document.getElementById("editUserId").value;
    const name  = document.getElementById("editUserName").value.trim();
    const email = document.getElementById("editUserEmail").value.trim();
    const phone = document.getElementById("editUserPhone").value.trim();
    const city  = document.getElementById("editUserCity").value.trim();

    if (!name) {
        showToast("⚠️ User name is required", "error");
        return;
    }

    try {

        showToast("💾 Saving changes...", "info");

        /*
        |-----------------------------------------------------------------
        | FETCH PUT REQUEST
        |-----------------------------------------------------------------
        */
        const response = await fetch(
            `${USERS_API}/${id}`,
            {
                method:  "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name:  name,
                    email: email,
                    phone: phone,
                    city:  city
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Update failed: ${response.status}`);
        }

        showToast("✅ User updated successfully!", "success");

        closeModal("editUserModal");

        await loadUsers();
        updateStats();

    }
    catch (error) {

        console.error("❌ Save user error:", error);
        showToast("❌ Failed to update user", "error");

    }

}


/*
|--------------------------------------------------------------------------
| FILTER PRODUCTS TABLE (Client-side search)
|--------------------------------------------------------------------------
*/

function filterProductsTable() {

    const search =
        document.getElementById("productSearch")
            .value.toLowerCase().trim();

    const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(search)    ||
        p.category.toLowerCase().includes(search) ||
        String(p.price).includes(search)
    );

    renderProductsTable(filtered);

}


/*
|--------------------------------------------------------------------------
| FILTER USERS TABLE (Client-side search)
|--------------------------------------------------------------------------
*/

function filterUsersTable() {

    const search =
        document.getElementById("userSearch")
            .value.toLowerCase().trim();

    const filtered = allUsers.filter(u =>
        u.name.toLowerCase().includes(search)  ||
        u.email.toLowerCase().includes(search) ||
        u.city.toLowerCase().includes(search)
    );

    renderUsersTable(filtered);

}


/*
|--------------------------------------------------------------------------
| SECTION NAVIGATION (SIDEBAR)
|--------------------------------------------------------------------------
|
| Shows/hides admin sections based on sidebar click
| Manages active states on nav items
|
*/

function showSection(section) {

    // Hide all sections
    const sections = document.querySelectorAll(".admin-section");
    sections.forEach(s => s.classList.remove("active"));

    // Show selected section
    const target = document.getElementById(`section-${section}`);
    if (target) target.classList.add("active");

    // Update nav active state
    const navItems = document.querySelectorAll(".sidebar-nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    const activeNav = document.getElementById(`nav-${section}`);
    if (activeNav) activeNav.classList.add("active");

    // Update topbar title
    const titles = {
        dashboard: ["Dashboard",          "Overview of your store"],
        products:  ["Product Management", "Edit and delete products"],
        users:     ["User Management",    "Edit and delete users"]
    };

    const topbarTitle    = document.getElementById("topbarTitle");
    const topbarSubtitle = document.getElementById("topbarSubtitle");

    if (topbarTitle && titles[section]) {
        topbarTitle.textContent    = titles[section][0];
        topbarSubtitle.textContent = titles[section][1];
    }

    // Close mobile sidebar
    closeSidebar();

}


/*
|--------------------------------------------------------------------------
| MODAL — OPEN / CLOSE
|--------------------------------------------------------------------------
*/

function openModal(id) {

    const modal = document.getElementById(id);
    if (modal) modal.classList.add("active");

}

function closeModal(id) {

    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("active");

}

// Close modal on overlay click
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("modal-overlay")) {
        e.target.classList.remove("active");
    }

});


/*
|--------------------------------------------------------------------------
| SIDEBAR TOGGLE (Mobile)
|--------------------------------------------------------------------------
*/

function toggleSidebar() {

    const sidebar = document.getElementById("adminSidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar) sidebar.classList.toggle("open");
    if (overlay) overlay.classList.toggle("active");

}

function closeSidebar() {

    const sidebar = document.getElementById("adminSidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("active");

}


/*
|--------------------------------------------------------------------------
| TOAST NOTIFICATION
|--------------------------------------------------------------------------
|
| Creates and auto-dismisses notification messages
| Types: "success", "error", "info"
|
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
    }, 3500);

}
