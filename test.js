function determineColor(input) {
 const x = input[0].toUpperCase().charCodeAt(0) - 64; // 1
 const y = parseInt(input.slice(1));    // 1

 if (x % 2 == 0 & y % 2 != 0  ) {
    return "White"
 }else if (x % 2 != 0 & y % 2 == 0) {
    return "White"
 }
else if (x % 2 == 0 & y % 2 == 0) {
    return "Black"
 }
 else if (x % 2 != 0 & y % 2 != 0) {
    return "Black"
 }
}

function main() {
    
    const input = "b2"
    const result = determineColor(input);
    console.log(result);
}

main();