require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const adminTokenAuth = require("./middleware/adminTokenAuthorization");
const tokenAuthorization = require("./middleware/token-auth");
const cartRouter = require("./routes/cart");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin/products", adminTokenAuth, adminRouter);
app.use("/api/v1/user/products", tokenAuthorization, userRouter);
app.use("/api/v1/user/cart", tokenAuthorization, cartRouter);

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
    process.exit(1);
  }
};

start();
