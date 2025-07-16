import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import urlRoutes from "./routes/urlroutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/shorturls", urlRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));

