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

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/seo", seoRoutes);

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("SEO SAAS Backend Running 🚀");
});

// ================= PORT =================
const PORT = process.env.PORT || 5000;

// ================= DATABASE + SERVER START =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Mongo Error:", err.message);

    // IMPORTANT: server should still run even if DB fails
    app.listen(PORT, () => {
      console.log(`⚠️ Server running WITHOUT DB on port ${PORT}`);
    });
  });