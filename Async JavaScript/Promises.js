// A Promise represents a future value.

// States:

// Pending
// Resolved (Fulfilled)
// Rejected




// const promise = new Promise((resolve, reject) => {

// });




// const promise = new Promise((resolve, reject) => {
//     resolve("Success");
// });

// promise.then(data => {
//     console.log(data);
// });


// const promise = new Promise((resolve, reject) => {
//     reject("Failed");
// });

// promise.catch(error => {
//     console.log(error);
// });





// const promise = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("Data Loaded");
//     }, 2000);
// });

// promise.then(data => {
//     console.log(data);
// });






const usersPromise = fetchUsers(); 

const postsPromise = fetchPosts();

const commentsPromise = fetchComments();

const [users, posts, comments] =
await Promise.all([
    usersPromise,
    postsPromise,
    commentsPromise
]);









