import express from "express";
import { analyzeKeywordController, generateBlogController } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", analyzeKeywordController);

router.post("/generate-blog", generateBlogController);

export default router;