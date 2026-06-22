// function greet(name) {
//     console.log("Hello " + name);
// }

// function processUser(callback) {
//     console.log("parent")
//     callback("Rahul");
// }

// processUser(greet);



// setTimeout(function () {
//     console.log("Message after 3 seconds");
// }, 3000);




// Download File
// Login User
// Load Data
// Read Database


// function callCustomer() {
//     console.log("Your pizza has arrived!");
// }

// function deliverPizza(callback) {
//     console.log("Delivering pizza...");
//     callback();
// }

// deliverPizza(callCustomer);


// fetch("/users")
//   .then(data => {
//       console.log(data);
//   });
// When data arrives, callback runs.






// function processData(callback) {
//     setTimeout(() => {
//         callback("Data Loaded");
//     }, 2000);
// }

// processData((msg) => {
//     console.log(msg);
// });



// Callback Hell
// loginUser(() => {
//     getProfile(() => {
//         getOrders(() => {
//             getPayment(() => {
//                 console.log("Done");
//             });
//         });
//     });
// });


// Problem:

// Hard to Read
// Hard to Debug
// Hard to Maintain




// fs.readFile("data.txt", (err, data) => {
//     if(err) {
//         console.log(err);
//         return;
//     }

//     console.log(data.toString());
// });


