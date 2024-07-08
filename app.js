import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { errorHandler, notFound } from "./src/middleware/errMiddleware.js";
import cors from 'cors'
import useragent from "express-useragent";


// Routes
import languageRoute from "./src/routes/languageRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import userRoute from "./src/routes/userRoute.js";
import Language from "./src/models/languageModel.js";
import Category from "./src/models/categoryModel.js";

dotenv.config();
connectDB();

const PORT = 5000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());  // Add useragent middleware here


app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/languages", languageRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);

// to add categories data in DB
app.post("/categories", async (req, res) => {
  const categoriesData = [
    {
      category: "Popular Stories Podcasts",
      keywords: "popular stories podcasts",
    },
    { category: "Spooky Horror Podcasts", keywords: "spooky mystery ghost" },
    {
      category: "Learn About Indian Mythology",
      keywords: "indian mythology religious history",
    },
    {
      category: "Stories and Fairy Tales for Children",
      keywords: "kids stories children stories",
    },
    {
      category: "Inspiring Stories from Real People",
      keywords: "motivating exciting interviews podcasts",
    },
    { category: "Podcasts and Shows", keywords: "podcasts shows" },
  ];
  const categories = await Category.insertMany(categoriesData);
  res.send(categories);
});

// to add languages data in DB
app.post("/languages", async (req, res) => {
  const languagesData = [
    { name: "Tamil", code: "ta" },
    { name: "English", code: "en en-US en-AU en-GB" },
    { name: "Telugu", code: "te" },
    { name: "Hindi", code: "hi" },
  ];
  const language = await Language.insertMany(languagesData);
  res.send(language);
});

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, console.log(`Server started on port ${PORT}`));
