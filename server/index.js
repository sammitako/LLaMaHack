import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";
import axios from "axios";
import * as dotenv from "dotenv";
import { connectToMongo } from "./db.js";
import User from "./models/user.js";

dotenv.config();

const app = express();
const port = 3000;
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// connectToMongo().catch((err) => console.log(err));

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

app.post("/api/toDB", function (req, res) {
  const user = new User({
    username: "spidermam",
    age: "19",
    weight: "190lb",
    gender: "ml",
  });
  user.save().then((val) => {
    res.json({ msg: "User Added Successfully", val: val });
  });
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

// gpt-4-32k-0314

const getSuggestionFromGPT4 = async (foodList) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Please tell me why do we need quadratic formula",
      },
    ],
    model: "gpt-4",
  });

  console.log(completion.choices[0]);
};

const getIngredientsFromGPT4 = async (url, asList) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Please analyze the attached image of a food dish. Identify all visible food items and their estimated quantities. Provide the results in a list of ingredients with measurements in imperial units, using common kitchen measures like cups, ounces, tablespoons, etc. For example, '1 cup rice, 10 oz chickpeas'. Provide a best-guess estimate if exact measurements are not possible. Assume standard serving sizes for each food item.don't provide any text beyond the ingredients that are present in the image. Also don't provide information such as cubed, sliced, halved etc. I strictly want the result in the above specified format. I am telling you again, stick with the format.",
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

const getNutritionDataIndividually = async (foodItems) => {
  let totalCalories = 0;

  const summary = [];

  const requiredFields = ["text"];

  const axiosReq = foodItems.map(async (item) => {
    const foodInfo = {};
    try {
      const response = await axios.get(
        "https://api.edamam.com/api/nutrition-data?app_id=" +
          encodeURIComponent(process.env.EDAMAM_APP_ID) +
          "&app_key=" +
          encodeURIComponent(process.env.EDAMAM_APP_KEY) +
          "&nutrition-type=logging&ingr=" +
          encodeURIComponent(item)
      );
      // console.log(response.data);
      foodInfo["calories"] = response.data["calories"];
      foodInfo["dietLabels"] = response.data["dietLabels"];
      foodInfo["text"] = response.data.ingredients[0].text;
      foodInfo["quantity"] = response.data.ingredients[0].parsed[0].quantity;
      foodInfo["measure"] = response.data.ingredients[0].parsed[0].measure;
      foodInfo["weight"] = response.data.ingredients[0].parsed[0].weight;
      foodInfo["foodMatch"] = response.data.ingredients[0].parsed[0].foodMatch;
      foodInfo["food"] = response.data.ingredients[0].parsed[0].food;
      summary.push(foodInfo);

      totalCalories += response.data.calories;
    } catch (error) {
      console.log(error);
    }
  });

  // Wait for all promises to resolve
  await Promise.all(axiosReq);

  // console.log(foodItems);
  console.log("total calories are", +totalCalories);
  return summary;
};

const getSuggestion = async (foodItems) => {
  // console.log(
  //   `I am 20 year old women and I just consumed ${foodItems.join(
  //     ","
  //   )}. Suggest me what to supplement more or anything that I miss to meet the daily intake for my profile. Give me just items and units like grams per items based on my profile and what I had today.\n\nCan you give me suggested nutritions as title and the Example food should be divided by those nutritions as title and specific food that we can eat with specific units (grams, cups, etc). That is, I do want these format -> Protein: meats(100g), fish(100g), etc`
  // );
  axios
    .post(
      "https://api.together.xyz/inference",
      {
        model: "mistralai/Mistral-7B-v0.1",
        max_tokens: 512,
        prompt:
          "I am 20 year old women and I just consumed 1 cup rice,10 oz chickpeas, 2 cup green tea. Suggest me what to supplement more or anything that I miss to meet the daily intake for my profile. Give me just items and units like grams per items based on my profile and what I had today. Can you give me suggested nutritions as title and the Example food should be divided by those nutritions as title and specific food that we can eat with specific units (grams, cups, etc). That is, I do want these format -> Protein: meats(100g), fish(100g), etc. Don't write anything extra",
        temperature: 2,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stream_tokens: false,
        stop: ["</s>", "[INST]"],
        negative_prompt: "",
        sessionKey: "353f87d3a237d33a540803f82328af73bc0e243f",
        repetitive_penalty: 1,
        update_at: "2023-12-10T17:51:14.651Z",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_AI_API_KEY}`,
        },
      }
    )
    .then(
      (response) => {
        console.log(response.data.output);
      },
      (error) => {
        console.log(error);
      }
    );
};

const getNutritionData = async (foodItems) => {
  const selectedFields = [
    "calories",
    "dietLabels",
    "totalDaily",
    "totalNutrientsKCal",
    "totalNutrients",
  ];

  const requestURL =
    "https://api.edamam.com/api/nutrition-details?app_id=" +
    encodeURIComponent(process.env.EDAMAM_APP_ID) +
    "&app_key=" +
    encodeURIComponent(process.env.EDAMAM_APP_KEY);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const data = JSON.stringify({
    ingr: foodItems,
  });

  const summary = {};

  const axiosReq = axios
    .post(requestURL, data, { headers })
    .then(function (response) {
      console.log(response.data);
      selectedFields.forEach((field) => {
        summary[field] = response.data[field];
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  // Wait for all promises to resolve
  await Promise.resolve(axiosReq);

  console.log(foodItems);
  return summary;
};

// GET request for food api
app.get("/api/nutritionData", async (req, res) => {
  //   const itemId = parseInt(req.params.id);
  //   const item = data.find((item) => item.id === itemId);

  console.log("eval image");

  // let foodItems = await getIngredientsFromGPT4(
  //   "https://www.asavoryfeast.com/wp-content/uploads/2014/07/CC-Burgers-5-735x490.jpg",
  //   true
  // );

  // foodItems = foodItems.replace(/\n/g, "").split("- ").filter(Boolean);

  let foodItems = [
    "1 hamburger bun",
    "6 oz ground beef patty",
    "1 oz cheddar cheese",
    "1 tablespoon mayonnaise",
    "1 oz cooked bacon",
    "1/4 cup fresh spinach leaves",
  ];

  const nutritionData = await getNutritionData(foodItems);

  const individualItemData = await getNutritionDataIndividually(foodItems);

  const foodData = {};
  foodData["combinedData"] = nutritionData;
  foodData["individualData"] = individualItemData;

  console.log(foodData);

  res.json(foodData);
});

// GET request for gpt vision api call
app.get("/api/evaluateImage", async (req, res) => {
  //   const itemId = parseInt(req.params.id);
  //   const item = data.find((item) => item.id === itemId);

  console.log("eval image");

  let foodItems = await getIngredientsFromGPT4(
    "https://www.thefieryvegetarian.com/wp-content/uploads/2023/01/vegetarian-rasta-pasta-recipe-720x720.jpg",
    true
  );

  foodItems = foodItems.split("\n");

  foodItems = foodItems.map((line) => line.replace(/^-/, "").trim());

  // getSuggestion(foodItems);
  getSuggestionFromGPT4(foodItems);

  // foodItems = foodItems.replace(/\n/g, "").split("- ").filter(Boolean);

  console.log("Food Items:");
  console.log(foodItems);

  // let foodItems = [
  //   "1 hamburger bun",
  //   "6 oz ground beef patty",
  //   "1 oz cheddar cheese",
  //   "1 tablespoon mayonnaise",
  //   "1 oz cooked bacon",
  //   "1/4 cup fresh spinach leaves",
  // ];

  const nutritionData = await getNutritionData(foodItems);

  const individualItemData = await getNutritionDataIndividually(foodItems);

  const foodData = {};
  foodData["combinedData"] = nutritionData;
  foodData["individualData"] = individualItemData;

  console.log(foodData);

  res.json(foodItems);
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
