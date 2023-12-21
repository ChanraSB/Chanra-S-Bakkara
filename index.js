import express from "express";
import Router from "./recipes/recipe.router.js";
import userRouter from "./users/users.router.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(Router);
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world").json({ msg: "This is CORS-enabled for all origins!" });
});

app.get("/homepage", (req, res) => {
  res.send("This is the Homepage");
});

app.get("/dashboard", (req, res) => {
  res.send("This is the dashboard page");
});

app.listen(PORT, () => {
  console.log(`express API running in port: ${PORT}`);
});
