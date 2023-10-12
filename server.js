const express = require(`express`);
const cors = require("cors");
const mongoose = require("mongoose");

const Todo = require("./models/todo");

require("dotenv").config();

const app = express();

const apiPass = process.env.DB_PASSWORD;

//CONNECT TO MONGODB DATABASE
mongoose
  .connect(
    `mongodb+srv://felipeaocampo:${apiPass}@cluster0.emb9nn3.mongodb.net/todos?retryWrites=true&w=majority`
  )
  .then(() => console.log(`DB is connected too`));

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//REST API - ROUTES
app.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find({});

    return res.status(200).json({ data: todos });
  } catch (error) {
    console.log(error);
  }
});

app.post("/add-to-do", async (req, res, next) => {
  const { task } = req.body;

  try {
    await Todo.create({ task });

    const todos = await Todo.find({});

    return res.status(200).json({ data: todos });
  } catch (error) {
    //GUIDE TO ERROR HANDLING FUNCTION
    return;
  }
});

app.put("/to-do-status", async (req, res, next) => {
  const { id } = req.body;

  try {
    const todo = await Todo.findById(id);
    todo.status = !todo.status;
    await todo.save();

    const todos = await Todo.find({});
    return res.status(200).json({ data: todos });
  } catch (error) {
    console.log(error);
  }
});

//ERROR HANDLER (3 or 4 args??)

app.listen(8000, () => {
  console.log(`Server is live on port 8000`);
});
