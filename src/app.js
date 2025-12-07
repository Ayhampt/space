import express from "express";
import cors from "cors";
const app = express();

//configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "OPTIONS", "DELETE", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

//import routes
import healthCheckRouter from "./routes/healthcheck.route.js";

app.use("/api/v1/healthcheck", healthCheckRouter);

export default app;
