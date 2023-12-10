const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();


const app = express();
const port = 3000;
app.use(cors());


const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Placeholder data (you can replace this with a database or any other data source)
let data = [
  { id: 1, ame: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

// GET request to retrieve all items
app.get("/api/items", (req, res) => {
  console.log(process.env.OPEN_AI_KEY);
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

// GET request for gpt vision api call
app.get("/api/evaluateImage", async (req, res) => {
  //   const itemId = parseInt(req.params.id);
  //   const item = data.find((item) => item.id === itemId);

  console.log("eval image");

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What’s in this image? give me the edible components in this picture as a list of comma separated values.",
          },
          {
            type: "image_url",
            image_url: {
              url: "https://pinchofyum.com/wp-content/uploads/Chicken-Sweet-Potato-Meal-Prep-Bowls-Recipe.jpg",
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  });
  console.log(response.choices[0]);

  const listOfFoodItems = response.choices[0].message.content;

  console.log(listOfFoodItems);

  res.json(listOfFoodItems);
});

// // POST request to add a new item
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
