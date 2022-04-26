const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error");
const PORT = process.env.PORT || "3300";

// middleware
app.use(express.static("./public"));
app.use(errorHandlerMiddleware);
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("Todo Management is running on port 3300");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
