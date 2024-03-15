import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import morgan from "morgan";
import cors from "cors";

import productRoute from "./routes/product.route";
import categoryRoute from "./routes/category.route";
import uploadRoute from "./routes/upload.route";
import cartRoute from "./routes/cart.route";
import orderRoute from "./routes/order.route";
import setupSwaggerRoute from "./lib/swagger";
import userRoute from "./routes/user.route";
import fileRoute from "./routes/file.route";

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT || 4040;

// swtup swagger
app.use(setupSwaggerRoute);

// setup routes without bodyParser
app.use("/upload", uploadRoute);

// setup middelware
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization",
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// setup routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/files", fileRoute);

app.get("*", (req, res) => {
  res.status(404).send("Endpoint notfound 404 !");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
