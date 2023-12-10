const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Placeholder data (you can replace this with a database or any other data source)
let data = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

// GET request to retrieve all items
app.get("/api/items", (req, res) => {
  res.json(data);
});

// GET request to retrieve a specific item by ID
app.get("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = data.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// POST request to add a new item
app.post("/api/items", (req, res) => {
  const newItem = req.body;

  // Assuming a simple validation (name is required)
  if (!newItem.name) {
    res.status(400).json({ message: "Name is required" });
  } else {
    // Generate a unique ID (you might want to use a library for this in a real application)
    newItem.id = data.length + 1;

    // Add the new item to the data array
    data.push(newItem);

    res.status(201).json(newItem);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
