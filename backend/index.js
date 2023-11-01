const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/quiz-app")
  .then(() => console.log("Mongodb connected!"))
  .catch((err) => console.log("Mongo error", err));

app.use(cors())
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server Started at http://localhost:${PORT}`)
);