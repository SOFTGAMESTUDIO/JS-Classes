// =====================================================
// EXPRESS CRUD API USING JSON FILE
// =====================================================

// Import Express Framework
import express from "express";

// Import File System Module
import fs from "fs/promises";

// Create Express Application
const app = express();

// Middleware
// Converts JSON request body into JavaScript object
app.use(express.json());

// Path of JSON Database File
const FILE_PATH = "./users.json";

// =====================================================
// READ USERS FROM JSON FILE
// =====================================================

const getUsers = async () => {
  const data = await fs.readFile(
    FILE_PATH,
    "utf-8"
  );

  return JSON.parse(data);
};

// =====================================================
// SAVE USERS TO JSON FILE
// =====================================================

const saveUsers = async (users) => {
  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(users, null, 2)
  );
};

// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully"
  });
});

// =====================================================
// GET ALL USERS
// URL:
// GET http://localhost:5000/users
// =====================================================

app.get("/users", async (req, res) => {
  const users = await getUsers();

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users
  });
});

// =====================================================
// GET SINGLE USER
// URL:
// GET http://localhost:5000/users/1
// =====================================================

app.get("/users/:id", async (req, res) => {

  const users = await getUsers();

  const user = users.find(
    user => user.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user
  });
});

// =====================================================
// CREATE USER
// URL:
// POST http://localhost:5000/users
//
// Body:
// {
//   "name":"Livesh",
//   "email":"livesh@gmail.com"
// }
// =====================================================

app.post("/users", async (req, res) => {

  const users = await getUsers();

  const newUser = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);

  await saveUsers(users);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
});

// =====================================================
// REPLACE ENTIRE USER
// URL:
// PUT http://localhost:5000/users/1
//
// Body:
// {
//   "name":"New Name",
//   "email":"new@gmail.com"
// }
// =====================================================

app.put("/users/:id", async (req, res) => {

  const users = await getUsers();

  const index = users.findIndex(
    user => user.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  users[index] = {
    id: Number(req.params.id),
    name: req.body.name,
    email: req.body.email || "test@gmail.com"
  };

  await saveUsers(users);

  res.status(200).json({
    success: true,
    message: "User replaced successfully",
    data: users[index]
  });
});

// =====================================================
// UPDATE SPECIFIC FIELDS
// URL:
// PATCH http://localhost:5000/users/1
//
// Body:
// {
//   "name":"Updated Name"
// }
// =====================================================

app.patch("/users/:id", async (req, res) => {

  const users = await getUsers();

  const user = users.find(
    user => user.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  if (req.body.name) {
    user.name = req.body.name;
  }

  if (req.body.email) {
    user.email = req.body.email;
  }

  await saveUsers(users);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user
  });
});

// =====================================================
// DELETE USER
// URL:
// DELETE http://localhost:5000/users/1
// =====================================================

app.delete("/users/:id", async (req, res) => {

  const users = await getUsers();

  const userExists = users.find(
    user => user.id === Number(req.params.id)
  );

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const filteredUsers = users.filter(
    user => user.id !== Number(req.params.id)
  );

  await saveUsers(filteredUsers);

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});

// =====================================================
// START SERVER
// =====================================================

app.listen(5000, () => {
  console.log(
    "Server Running: http://localhost:5000"
  );
});