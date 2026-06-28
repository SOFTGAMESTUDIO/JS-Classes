// Local Storage is a browser feature that stores data permanently.

// * Data remains after browser restart.
// * Shared across all tabs of the same website.
// * Maximum size is around 5–10 MB depending on the browser.
// * Stores only strings.


// let date = new Date()
// console.log(date)
// US Style: MM/DD/YYYY
// console.log(new Intl.DateTimeFormat('en-US').format(date)); 

// // UK Style: DD/MM/YYYY
// console.log(new Intl.DateTimeFormat('en-GB').format(date)); 

// // Customized long format (e.g., "Monday, June 29, 2026")
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// console.log(new Intl.DateTimeFormat('en-US', options).format(date));

// // Customized long format (e.g., "Monday, 29 June, 2026")
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// console.log(new Intl.DateTimeFormat('en-GB', options).format(date));



// // Store data
// localStorage.setItem("name", "Livesh");

// // Get data
// console.log(localStorage.getItem("name"));

// // Remove one item
// localStorage.removeItem("name");

// // Remove everything
// localStorage.clear();

// // Number of items
// console.log(localStorage.length);

// // Key by index
// console.log(localStorage.key(0));






// Store Objects
// Wrong

// const user = {
//     name: "Livesh",
//     age: 22
// };
// localStorage.setItem("user", user);

// Output
// [object Object]

// Correct


// const user = {
//     name: "Livesh",
//     age: 22
// };

// localStorage.setItem(
//     "user",
//     JSON.stringify(user)
// );

// const data = JSON.parse(
//     localStorage.getItem("user")
// );

// console.log(data);






// When to Use

// ✅ Theme

// ✅ Language

// ✅ Cart

// ✅ Recently Viewed

// ✅ Settings

// ❌ Password

// ❌ JWT (prefer secure HttpOnly cookies in production)

// ❌ Bank Data