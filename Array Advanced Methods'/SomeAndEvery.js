// const marks = [80, 85, 70, 90]; 
// const allPassed = marks.some( mark => mark >= 80 ); 
// console.log(allPassed);

const marks2 = [80, 85, 70, 90]; 
const allPassed = marks2.every( mark2 => mark2 >= 80 ); 
console.log(allPassed);


// And gate 
//  T   T    = T
//  F   T    = F
//  T   F    = F
//  F   F    = F

// Or gate 
//  T   T    = T
//  F   T    = T
//  T   F    = T
//  F   F    = F