// let arr = [50,90,40,60,70,20,30];
// let newarr = arr.sort()
// console.log(newarr)

const marks = [70, 50, 90, 60]; 
marks.sort((a, b) => a - b); 
console.log(marks);

marks.sort((a, b) => b - a); 
console.log(marks);