// Modern way to handle Promises.
// Makes asynchronous code look synchronous.





function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data Loaded");
        }, 2000);
    });
}

async function getData() {
    const data = await fetchData();

    console.log(data);
    console.log("Success data 1");
}

function getData2() {
    const data = fetchData();

    console.log(data);
    console.log("Success data 2");
}

getData();
getData2();












// async function getUsers() {
//     try {
//         const response = await fetch("/users");

//         const users = await response.json();

//         console.log(users);
//     }
//     catch(error) {
//         console.log(error);
//     }
// }