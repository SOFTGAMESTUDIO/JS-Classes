fetch("/user")
.then(res => res.json())
.then(user => {
    return fetch(`/orders/${user.id}`);
})
.then(res => res.json())
.then(orders => {
    console.log(orders);
})
.catch(error => {
    console.log(error);
});


// flow strucher 

/* 
 /user
    res =>  user:{user data (id, name, email, uid, access tocken, refreshtocken,)}
    user => user:{
            fetch /orders/user.id
            }
    res =>  orders{order id, user id, title, dec, price, payment status, shiping sttus, mode of payment  }
    orders => orders { 
             Display all orders of teh user 
              }
 error => {shor error }

*/
  

// fetch("https://jsonplaceholder.typicode.com/users")
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.log(error);
// });