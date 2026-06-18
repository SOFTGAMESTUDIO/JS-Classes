let country = "India";

function outer() {
  let state = "Punjab";

  function inner() {
    console.log(country);
    console.log(state);
  }

  if (state != "Punjab") {
    console.log(country);
    let state = "Rajasthan";
    console.log(state);
  } else {
    inner();
  }
}


function woo(){
  
}


outer();
