/*
|--------------------------------------------------------------------------
| SGS E-COM — CART SCRIPT
|--------------------------------------------------------------------------
|
| File: cart.js
| Status: Future Feature
|
| Concepts to be demonstrated:
|   ✓ localStorage
|   ✓ sessionStorage
|   ✓ JSON.parse() / JSON.stringify()
|   ✓ Array push()
|   ✓ Array filter()
|   ✓ Array reduce()
|   ✓ DOM Manipulation
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| CART KEY IN localStorage
|--------------------------------------------------------------------------
*/

const CART_KEY = "sgs_ecom_cart";


/*
|--------------------------------------------------------------------------
| GET CART FROM localStorage
|--------------------------------------------------------------------------
|
| localStorage stores data as strings
| JSON.parse() converts string back to JS object/array
|
*/

function getCart() {

    const cartData = localStorage.getItem(CART_KEY);

    return cartData ? JSON.parse(cartData) : [];

}


/*
|--------------------------------------------------------------------------
| SAVE CART TO localStorage
|--------------------------------------------------------------------------
|
| JSON.stringify() converts JS array → string for storage
|
*/

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/*
|--------------------------------------------------------------------------
| ADD TO CART
|--------------------------------------------------------------------------
*/

function addToCart(product) {

    const cart = getCart();

    // Check if product already exists
    const existingIndex = cart.findIndex(
        item => item.id === product.id
    );

    if (existingIndex !== -1) {

        // Increase quantity
        cart[existingIndex].quantity += 1;

    } else {

        // Add new item
        cart.push({
            id:       product.id,
            title:    product.title,
            price:    product.price,
            image:    product.image,
            quantity: 1
        });

    }

    saveCart(cart);

    return cart.length;

}


/*
|--------------------------------------------------------------------------
| REMOVE FROM CART
|--------------------------------------------------------------------------
|
| Uses Array.filter() to remove item by ID
|
*/

function removeFromCart(id) {

    const cart = getCart();

    const updatedCart = cart.filter(
        item => item.id !== id
    );

    saveCart(updatedCart);

}


/*
|--------------------------------------------------------------------------
| GET CART TOTAL
|--------------------------------------------------------------------------
|
| Uses Array.reduce() to sum up prices
|
*/

function getCartTotal() {

    const cart = getCart();

    return cart.reduce(
        (total, item) =>
            total + (Number(item.price) * item.quantity),
        0
    );

}


/*
|--------------------------------------------------------------------------
| GET CART COUNT
|--------------------------------------------------------------------------
*/

function getCartCount() {

    const cart = getCart();

    return cart.reduce(
        (count, item) => count + item.quantity,
        0
    );

}


/*
|--------------------------------------------------------------------------
| CLEAR CART
|--------------------------------------------------------------------------
*/

function clearCart() {

    localStorage.removeItem(CART_KEY);

}


/*
|--------------------------------------------------------------------------
| CART SUMMARY
|--------------------------------------------------------------------------
|
| Returns cart details for display
|
*/

function getCartSummary() {

    const cart  = getCart();
    const total = getCartTotal();
    const count = getCartCount();

    return {
        items:    cart,
        total:    total,
        count:    count,
        isEmpty:  cart.length === 0
    };

}
