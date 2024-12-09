require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
app.use(express.json());

app.use("/api/v1/auth/user", authRouter);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
