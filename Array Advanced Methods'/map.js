const students = [
    { id: 1, name: "Rahul", age: 20, course: "BCA" },
    { id: 2, name: "Rohit", age: 21, course: "BTech" },
    { id: 3, name: "Aman", age: 19, course: "BCA" },
    { id: 4, name: "Mohit", age: 22, course: "BSc" },
    { id: 5, name: "Karan", age: 20, course: "BCom" },
    { id: 6, name: "Neha", age: 21, course: "BCA" },
    { id: 7, name: "Priya", age: 19, course: "BBA" },
    { id: 8, name: "Anjali", age: 20, course: "BTech" },
    { id: 9, name: "Simran", age: 22, course: "BSc" },
    { id: 10, name: "Pooja", age: 20, course: "BCA" }
];

// const reformattedArray = kvArray.map(({ key, value }) => ({ [key]: value }));
const updatenew = students.map(({name, course}) => ({Name: name, Course : course}))
console.log(updatenew)

