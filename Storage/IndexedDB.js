// IndexedDB is a browser database.

// It stores:

// Objects
// Arrays
// Images
// Files
// Videos
// Large datasets

// Supports hundreds of MBs or more, depending on browser policies and available storage.


// Why IndexedDB?

// Imagine an offline shopping app.

// Products
// Users
// Orders
// Images

// Cannot store this efficiently in Local Storage.

// IndexedDB is designed for this.



// Create Database

// const request = indexedDB.open(
//     "MyDatabase",
//     1
// );


// request.onupgradeneeded = function(event){

//     const db = event.target.result;

//     db.createObjectStore(
//         "users",
//         {
//             keyPath:"id"
//         }
//     );

// };







// Add Data

// const db = request.result;

// const transaction = db.transaction(
//     "users",
//     "readwrite"
// );



// const store = transaction.objectStore(
//     "users"
// );



// store.add({
//     id:1,
//     name:"Livesh"
// });












// Read Data

// store.get(1).onsuccess = function(event){

//     console.log(event.target.result);

// };




// When to Use

// Offline App

// PWA

// Large Cache

// Media Files

// Offline Notes

// Large API Responses





// Feature	                      Local	        Session	       IndexedDB
// Objects	                      JSON	        JSON	       Native
// Images	                       ❌	        ❌	          ✅
// Files	                       ❌	        ❌	          ✅
// Large Data	                   ❌	        ❌	          ✅
// SQL	                           ❌	        ❌	        NoSQL
// Offline Apps	                  Limited	    Limited	       Excellent