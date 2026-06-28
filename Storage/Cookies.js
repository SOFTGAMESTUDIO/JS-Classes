// What are Cookies?

// Cookies are small pieces of text data that a website stores in your browser. Every time your browser sends a request to the same website, the browser automatically sends the relevant cookies along with the HTTP request.

// Cookies help websites remember users, login sessions, preferences, and other information.

// Think of cookies as a small identity card that your browser carries for a website.



// Cookies are small pieces of data sent with HTTP requests.

// Used for:

// Login sessions
// Authentication
// User preferences

// Example:

// document.cookie =
// "name=Livesh";

// Modern applications often use secure, HttpOnly cookies for 
// authentication because JavaScript cannot read HttpOnly cookies, reducing the risk from XSS attacks.




// How Cookies Work

// Suppose you visit:

// https://example.com
// Step 1: User Opens Website
// Browser
//       │
//       │  HTTP Request
//       ▼
// Server



// The browser sends a request to the server.


// Step 2: Server Creates a Cookie

// The server responds with a special HTTP header:

// Set-Cookie:
// sessionId=abc123xyz

// The browser saves this cookie automatically.



// Step 3: Browser Stores Cookie
// Browser

// Cookies

// sessionId = abc123xyz




// Step 4: Next Request

// Whenever the browser requests another page from the same website:

// GET /profile

// Cookie:
// sessionId=abc123xyz

// The server receives the cookie and identifies the user.




// Which Storage Should You Use?
// Situation	                   Best Choice
// Theme	                       Local Storage
// Shopping Cart	               Local Storage (or backend sync)
// Authentication                  Session	Secure HttpOnly Cookie
// Multi-Step Form	               Session Storage
// Offline Notes	               IndexedDB
// Offline Images	               IndexedDB
// Large Data	                   IndexedDB






