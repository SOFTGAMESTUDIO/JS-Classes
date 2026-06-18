
let a = document.getElementById("btn")
let b = document.getElementById("title")

a.addEventListener("click", () => {
    let c = prompt("Enter Your name :")
    b.textContent = "Hello " + c
})