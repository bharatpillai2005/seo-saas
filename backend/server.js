import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import aiRoutes from "./routes/aiRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import seoRoutes from "./routes/seo.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/seo", seoRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });
app.get("/", (req, res) => {
  res.send("SEO SAAS Backend Running 🚀");
});
