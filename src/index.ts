import express from "express";
import http from "http";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TsEcommerceAPI",
      version: "1.0.0",
    },
  },
  apis: ["./src/controllers/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

const MONGO_URL =
  "mongodb://db:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";

mongoose.Promise = Promise;
const connectWithRetry = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error: Error) => {
      console.log("Failed to connect to MongoDB:", error);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
  console.log("Retrying connection in 5 seconds...");
  setTimeout(connectWithRetry, 5000);
});

connectWithRetry();

app.use("/", router());
