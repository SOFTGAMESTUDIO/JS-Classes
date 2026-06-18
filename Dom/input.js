const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let arr = ["Apple", "Banana", "Mango"];
console.log("Befor");
console.log(arr);
let m = arr.length;
rl.question(
  "1. Insert\n2.Delete \n3. Update \nEnter the input wich you want : ",
  (input) => {
    if (input == "1") {
      rl.question("Enter Insert Element :", (input) => {
        let a = String(input);
        arr.push(a);
        console.log("After");
        console.log(arr);
        rl.close();
      });
    } else if (input == "2") {
      rl.question(
        "Enter Place/Index (started form Zero) of Element :",
        (input) => {
          let b = Number(input);
          if (b >= m){
            console.log("Invalid index")
            rl.close();
          }
          arr.splice(b, 1);
          console.log("After");
          console.log(arr);
          rl.close();
        },
      );
    } else if (input == "3") {
      rl.question("Enter the update value index : ", (input) => {
        let c = Number(input);
        rl.question("Enter the updated value :", (input) => {
          let d = String(input);
          if (b >= m){
            console.log("Invalid index")
            rl.close();
          }
          arr.splice(c, 1, d);
          console.log("After");
          console.log(arr);
          rl.close();
        });
      });
    } else {
      console.log("Invalid Input");
    }
  },
);





// setp 1 = Requrments - input users 
// step 2 = selet user option (insert / update / delete )
// step 3 =  insret (push()) value 
// step 4 =  delete (splice()) indexed
// step 5 =  update (Splice()) index value 
// step 6  = exit 



