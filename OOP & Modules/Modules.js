// Modules split code into multiple files.

// Benefits:

// Better organization
// Reusable code
// Easier maintenance
// Avoid global variables


// import { add, multiply } from "./math.js";
// import { subtract, Addition } from "./calculator.js";

import * as a from "./math.js"

console.log(a.add(9, 4));
// console.log(multiply(5, 4));
// console.log(subtract(5, 4));
// console.log(Addition(5, 4));
// console.log(division(5,4))