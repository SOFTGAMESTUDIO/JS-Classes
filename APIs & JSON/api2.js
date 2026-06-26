// ==========================================================
// APIs & FETCH API COMPLETE NOTES
// ==========================================================

// ==========================================================
// WHAT IS AN API ?
// ==========================================================

// API stands for Application Programming Interface.

// An API allows two applications to communicate
// with each other.

// Example:

// Suppose you have a Weather App.

// Your App requests weather data.
// Weather Server sends weather data.

// Communication happens using an API.

/*

Your App  -----> API Request -----> Server

Your App  <----- API Response <----- Server

*/

// ==========================================================
// WHAT IS FETCH API ?
// ==========================================================

// Fetch API is a built-in JavaScript feature.

// Used to send requests from frontend to backend.

// Common HTTP Methods:

// GET
// POST
// PUT
// PATCH
// DELETE

// ==========================================================
// HTTP METHODS
// ==========================================================

/*

Operation              Method

Create Data            POST

Read Data              GET

Update Entire Data     PUT

Update Partial Data    PATCH

Delete Data            DELETE

*/

// ==========================================================
// FETCH SYNTAX
// ==========================================================

// fetch(url)

// Example

// fetch("https://jsonplaceholder.typicode.com/users")

// ==========================================================
// RESPONSE OBJECT
// ==========================================================

// Whenever fetch() completes,
// it returns a Response Object.

// Important Properties:

// response.status
// response.ok
// response.headers
// response.json()

// Example

// console.log(response.status);

// Output

// 200

// ==========================================================
// STATUS CODES
// ==========================================================

/*


200 = Success

201 = Resource Created

400 = Bad Request

401 = Unauthorized

403 = Forbidden

404 = Not Found

500 = Internal Server Error

*/

// ==========================================================
// GET METHOD
// ==========================================================

// Purpose:

// Fetch Data From Server

// Example URL

// https://jsonplaceholder.typicode.com/users

// Using Promise

// fetch(
//   "https://jsonplaceholder.typicode.com/users"
// )
// .then(response => response.json())
// .then(data => {
//   console.log(data);
// });

// Using Async Await

// async function getUsers() {
//     const response = await  fetch(
//         "https://jsonplaceholder.typicode.com/users"
//     );
//   console.log(response.status);
//   console.log(response.ok);
//   const data = await response.json();
//   console.log(data);
// }
// getUsers();

// Flow

/*

Browser

```
|
```

GET /users

```
|
```

Server

```
|
```

Users Data

```
|
```

Browser

*/

// ==========================================================
// POST METHOD
// ==========================================================

// Purpose:

// Create New Data

// POST sends data to server.

// Example

// const user = {
//     name: "Livesh",
//     email: "sss@gmail.com"
// }

fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => response.json())
.then(data => {
  console.log(data);
})



// Async Await Version

// async function createPost() {

//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/posts",
//     {
//       method: "POST",

//       headers: {
//         "Content-Type":
//         "application/json"
//       },

//       body: JSON.stringify({
//         title: "JavaScript",
//         body: "Learning APIs"
//       })
//     }
//   );

//   console.log(response.status);

//   const data =
//   await response.json();

//   console.log(data);

// }

// createPost();

// ==========================================================
// HEADERS
// ==========================================================

// Headers provide additional information
// about request.

// Common Headers

/*

headers: {

"Content-Type":
"application/json",

"Authorization":
"Bearer TOKEN"

}

*/

// Content-Type

// Tells server what type of data
// we are sending.

// application/json

// Means JSON Data.

// ==========================================================
// REQUEST BODY
// ==========================================================

// Body contains data sent to server.

// Example

/*

body: JSON.stringify({

title: "JavaScript",

body: "Learning APIs"

})

*/

// JSON.stringify()

// Converts JavaScript Object
// into JSON String.

// ==========================================================
// PUT METHOD
// ==========================================================

// Purpose:

// Replace Entire Resource

// Existing User

/*

{
id:1,
name:"John",
email:"[john@gmail.com](mailto:john@gmail.com)"
}

*/

// PUT Request

// async function replaceUser() {

//   const response = await fetch(
//     "http://localhost:5000/users/3",
//     {
//       method: "PUT",

//       headers: {
//         "Content-Type":
//         "application/json"
//       },

//       body: JSON.stringify({
//         name: "Rohit",
//       //   email: "Rohit@gmail.com",
//       //   phone : "0123456789"
//       })
//     }
//   );

//   const data =
//   await response.json();

//   console.log(data);

// }

// replaceUser();

// Result

/*

{
id:1,
name:"Livesh",
email:"[livesh@gmail.com](mailto:livesh@gmail.com)"
}

*/

// ==========================================================
// PATCH METHOD
// ==========================================================

// Purpose:

// Update Specific Fields Only.

// Existing User

/*

{
id:1,
name:"John",
email:"[john@gmail.com](mailto:john@gmail.com)"
}

*/

// PATCH Request

// async function updateUser() {

//   const response = await fetch(
//     "http://localhost:5000/users/5",
//     {
//       method: "PATCH",

//       headers: {
//         "Content-Type":
//         "application/json"
//       },

//       body: JSON.stringify({
//         name:"Livesh Garg"
//       })
//     }
//   );

//   const data =
//   await response.json();

//   console.log(data);

// }

// updateUser();

// Result

/*

{
id:1,
name:"Livesh Garg",
email:"[john@gmail.com](mailto:john@gmail.com)"
}

*/

// Only name changed.

// Email remains same.

// ==========================================================
// DELETE METHOD
// ==========================================================

// Purpose:

// Remove Data From Server.

// async function deleteUser() {

//   const response = await fetch(
//     "http://localhost:5000/users/4",
//     {
//       method: "DELETE"
//     }
//   );

//   const data =
//   await response.json();

//   console.log(data);

// }

// deleteUser();

// Result

/*

{
success:true,
message:"User deleted"
}

*/

// ==========================================================
// ERROR HANDLING
// ==========================================================

// Errors may occur because:

// No Internet

// Wrong URL

// Server Down

// Permission Denied

// Example

// async function getUsers() {

//   try {

//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/users"
//     );

//     if (!response.ok) {

//       throw new Error(
//         `HTTP Error ${response.status}`
//       );

//     }

//     const data =
//     await response.json();

//     console.log(data);

//   }

//   catch(error) {

//     console.log(
//       error.message
//     );

//   }

// }

// getUsers();

// ==========================================================
// COMPLETE FETCH FLOW
// ==========================================================

/*

1. User Clicks Button

   ```
    |
   ```

2. fetch() Sends Request

   ```
    |
   ```

3. Server Receives Request

   ```
    |
   ```

4. Server Processes Data

   ```
    |
   ```

5. Server Sends Response

   ```
    |
   ```

6. response.json()

   ```
    |
   ```

7. JavaScript Object Created

   ```
    |
   ```

8. Data Displayed To User

*/

// ==========================================================
// INTERVIEW QUESTIONS
// ==========================================================

// Q. What is API?

// A. A system that allows two applications
//    to communicate with each other.

// Q. What is Fetch API?

// A. JavaScript API used to make
//    HTTP Requests.

// Q. Difference Between GET and POST?

// GET  -> Fetch Data

// POST -> Create Data

// Q. Difference Between PUT and PATCH?

// PUT -> Replace Entire Resource

// PATCH -> Update Specific Fields

// Q. What does response.json() do?

// Converts JSON Response
// into JavaScript Object.

// Q. What does response.status return?

// HTTP Status Code.

// Q. What does response.ok return?

// true  -> Success

// false -> Failed
