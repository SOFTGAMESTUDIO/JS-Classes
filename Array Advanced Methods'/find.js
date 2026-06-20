const products =  [
    { id: 301, name: "Laptop", price: 65000, stock: 15 },
    { id: 302, name: "Mouse", price: 800, stock: 50 },
    { id: 303, name: "Keyboard", price: 1200, stock: 40 },
    { id: 304, name: "Monitor", price: 15000, stock: 20 },
    { id: 305, name: "Printer", price: 10000, stock: 10 },
    { id: 306, name: "Tablet", price: 25000, stock: 12 },
    { id: 307, name: "Speaker", price: 3000, stock: 30 },
    { id: 308, name: "Headphones", price: 2000, stock: 25 },
    { id: 309, name: "Webcam", price: 1800, stock: 18 },
    { id: 310, name: "SSD", price: 5000, stock: 35 }
]

const updatenew = products.find(products => products.name == "Laptop" )
console.log(updatenew)





