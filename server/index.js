require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const todoRoutes = require("./routes/todoRoutes");
app.use("/todos", todoRoutes);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
