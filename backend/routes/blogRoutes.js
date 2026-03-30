import express from "express";
import {
  createBlog,
  getMyBlogs,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// 🔥 TEST ROUTE (browser check के लिए)
router.get("/", (req, res) => {
  res.json({ message: "Blog API Working ✅" });
});


// 🔥 AI Content Generate Route
router.post("/generate", protect, async (req, res) => {
  try {
    const { keywords } = req.body;

    if (!keywords) {
      return res.status(400).json({ message: "Keywords are required" });
    }

    const content = `
AI generated SEO blog content for: ${keywords}

Introduction:
This blog explains about ${keywords} in detail.

Main Content:
- Point 1 about ${keywords}
- Point 2 about ${keywords}
- Benefits of ${keywords}

Conclusion:
This is why ${keywords} is important in today's market.
`;

    res.status(200).json({ success: true, content });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "AI generation failed" });
  }
});


// ✅ Create Blog
router.post("/create", protect, createBlog);

// ✅ Get My Blogs
router.get("/my-blogs", protect, getMyBlogs);

// ✅ Update Blog
router.put("/:id", protect, updateBlog);

// ✅ Delete Blog
router.delete("/:id", protect, deleteBlog);


export default router;