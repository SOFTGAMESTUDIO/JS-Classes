// ==========================================================
// ERROR HANDLING
// ==========================================================

// Errors may occur while making API requests.

// Common Reasons:

// 1. No Internet Connection

// 2. Wrong API URL

// 3. Server Down

// 4. Permission Denied

// 5. Invalid Request Data

// 6. Internal Server Error

// ==========================================================
// TRY CATCH
// ==========================================================

// try
// Code that may cause an error.

// catch
// Handles the error gracefully.

// Example

// async function getUsers() {

//   try {

//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/users"
//     );

//     const data =
//     await response.json();

//     console.log(data);

//   }
//   catch(error) {

//     console.log(
//       "Error:",
//       error.message
//     );

//   }

// }

// getUsers();

// ==========================================================
// CHECKING HTTP ERRORS
// ==========================================================

// fetch() only throws errors for network issues.

// For HTTP errors like:
// 404
// 500
// 401

// We must manually check response.ok

// Example

// async function getUsers() {

//   try {

//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/users"
//     );

//     if (!response.ok) {

//       throw new Error(
//         `HTTP Error: ${response.status}`
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
// RESPONSE.OK
// ==========================================================

// response.ok

// Returns:

// true
// If status code is between 200 - 299

// false
// For error status codes

// Example

// console.log(response.ok);

// ==========================================================
// RESPONSE.STATUS
// ==========================================================

// Returns HTTP Status Code

// Example

// console.log(response.status);

// Common Status Codes

// 200 = OK

// 201 = Created

// 400 = Bad Request

// 401 = Unauthorized

// 403 = Forbidden

// 404 = Not Found

// 500 = Internal Server Error

// ==========================================================
// USING .catch()
// ==========================================================

// fetch(
//   "https://wrong-url.com"
// )
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => {
//   console.log(error);
// });

// ==========================================================
// COMPLETE ERROR HANDLING FLOW
// ==========================================================

/*

User Sends Request

```
    |
```

fetch()

```
    |
```

Server Response

```
    |
```

response.ok ?

/           \

true         false

|              |

Data       Throw Error

|              |

Display     catch()

*/

// ==========================================================
// INTERVIEW QUESTIONS
// ==========================================================

// Q. Why do we use try-catch?

// Q. What is response.ok?

// Q. What is response.status?

// Q. Does fetch() throw errors for 404?

// We must manually check:

// Q. Which block handles errors?

































// Q. Why do we use try-catch?

// To handle runtime errors safely.

// Q. What is response.ok?

// Returns true if request was successful.

// Q. What is response.status?

// Returns HTTP status code.

// Q. Does fetch() throw errors for 404?

// No.

// We must manually check:

// if (!response.ok)

// Q. Which block handles errors?

// catch(error)
