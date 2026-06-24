// API stands for Application Programming Interface.
// An API allows two applications to communicate with each other.

// Suppose you have a weather app.

// // Your app sends a request to a weather server.
// // The server sends weather data back.
// // This communication happens through an API.

/*
Your App  ---> API Request ---> Server
Your App  <--- API Response --- Server
*/




// Fetch API


// Used for:

// * GET
// * POST
// * PUT
// * PATCH
// * DELETE


// fetch(url)
// fetch("https://jsonplaceholder.typicode.com/users")


// fetch("https://jsonplaceholder.typicode.com/users")
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });


// async function getUsers() {
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/users"
//   );

//   console.log(response.status); // 200
//   console.log(response.ok);     // true

//   const data = await response.json();

//   console.log(data);
// }

// getUsers();



// response.status
// response.ok
// response.headers
// response.json()



// Operation	            Method
// Create Data	            POST
// Read Data	            GET
// Update Entire Data	    PUT
// Update Partial Data	    PATCH
// Delete Data	            DELETE



// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     title: "JavaScript",
//     body: "Learning APIs"
//   })
// })
// .then(response => response.json())
// .then(data => console.log(data));


// async function getUsers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     title: "JavaScript",
//     body: "Learning APIs"
//   })
// })

//   console.log(response.status); // 200
//   console.log(response.ok);     // true
//   const data = await response.json();
//   console.log(data);
// }
// getUsers();

