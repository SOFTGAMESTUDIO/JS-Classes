// A Closure allows a function to access variables from its outer 
// function even after the outer function has finished execution.

function outer() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter = outer();

counter();
counter();
counter();


// outer()
//    |
//    |-- count = 0
//    |
//    |-- returns inner function
//             |
//             |-- remembers count
//             |
//             |-- count++
