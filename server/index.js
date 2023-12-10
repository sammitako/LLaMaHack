// const express = require("express");
// const bodyParser = require("body-parser");
// const OpenAI = require("openai");
// const cors = require("cors");
// const axios = require("axios");

import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";
import axios from "axios";
import * as dotenv from "dotenv";
import { URL } from "url";

dotenv.config();

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

const getIngredientsListFromGPT4 = async (url) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Please analyze the attached image of a food dish. Identify all visible food items and their estimated quantities. Provide the results in a list of ingredients with measurements in imperial units, using common kitchen measures like cups, ounces, tablespoons, etc. For example, '1 cup rice, 10 oz chickpeas'. Provide a best-guess estimate if exact measurements are not possible. Assume standard serving sizes for each food item.don't provide any text beyond the ingredients that are present in the image. Also don't provide information such as cubed, sliced, halved etc.",
          },
          {
            type: "image_url",
            image_url: {
              url: url,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  });
  console.log(response.choices[0]);

  const listOfFoodItems = response.choices[0].message.content;

  return listOfFoodItems;
};

const getNutritionData = async (foodItems) => {
  console.log("https://api.edamam.com/api/nutrition-data");

  let totalCalories = 0;

  const axiosReq = foodItems.map(async (item) => {
    try {
      const response = await axios.get(
        "https://api.edamam.com/api/nutrition-data?app_id=" +
          encodeURIComponent(process.env.EDAMAM_APP_ID) +
          "&app_key=" +
          encodeURIComponent(process.env.EDAMAM_APP_KEY) +
          "&nutrition-type=logging&ingr=" +
          encodeURIComponent(item)
      );
      console.log(response.data.ingredients);
      console.log(response.data.calories);
      totalCalories += response.data.calories;
    } catch (error) {
      console.log(error);
    }
  });

  // Wait for all promises to resolve
  await Promise.all(axiosReq);

  console.log(foodItems);
  console.log("total calories are", +totalCalories);
};

// GET request for gpt vision api call
app.get("/api/evaluateImage", async (req, res) => {
  //   const itemId = parseInt(req.params.id);
  //   const item = data.find((item) => item.id === itemId);

  console.log("eval image");

  let foodItems = await getIngredientsListFromGPT4(
    "https://www.eatthis.com/wp-content/uploads/sites/4/2019/11/thanksgiving-turkey-dinner-plate.jpg?quality=82&strip=1"
  );

  //   foodItems =
  //     "lettuce, cherry tomatoes, hard-boiled eggs, chicken breast, avocado, bacon, blue cheese crumbles, chives.";

  foodItems = foodItems.replace(/\n/g, "").split("- ").filter(Boolean);

  //   const foodItems = ["3 oz turkey"];
  const nutritionData = getNutritionData(foodItems);

  res.json(foodItems);
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
