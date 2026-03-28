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

// ================= ROOT =================
app.get("/", (req, res) => {
  res.status(200).send("SEO SAAS Backend Running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ================= PORT =================
const PORT = process.env.PORT || 8080;

// ================= START SERVER FIRST =================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ================= CONNECT DB (separately) =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err.message));