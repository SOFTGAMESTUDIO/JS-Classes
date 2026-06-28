// 2. Session Storage

// Similar to Local Storage.

// Difference:

// Removed when tab closes.
// Not shared between tabs.



// sessionStorage.setItem("token", "123");

// console.log(
//     sessionStorage.getItem("token")
// );

// sessionStorage.removeItem("token");

// sessionStorage.clear();



// Use Cases

// Login Wizard

// OTP Verification

// Multi-step Forms

// Temporary Filters

// Current Session Data





//                  Local Storage         vs     Session Storage
// Feature	        Local Storage	             Session Storage
// Capacity	        5–10MB	                     5–10MB
// Expiry	        Never	                     Until tab closes
// Shared Tabs	    Yes	                         No
// Data Type	    String	                     String
// Persistent	    ✅	                        ❌