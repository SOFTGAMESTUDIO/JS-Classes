// Modules split code into multiple files.

// Benefits:

// Better organization
// Reusable code
// Easier maintenance
// Avoid global variables


import { add, multiply } from "./math.js";
import division, { subtract, Addition } from "./calculator.js";

console.log(add(5, 4));
console.log(multiply(5, 4));
console.log(subtract(5, 4));
console.log(Addition(5, 4));
console.log(division(5,4))