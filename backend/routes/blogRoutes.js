import express from "express";
import {
  createBlog,
  getMyBlogs,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// 🔥 AI Content Generate Route
router.post("/generate", protect, async (req, res) => {
  try {
    const { keywords } = req.body;

    if (!keywords) {
      return res.status(400).json({ message: "Keywords are required" });
    }

    // Simple AI response (abhi dummy hai)
    const content = `AI generated SEO blog content for: ${keywords}

Introduction:
This blog explains about ${keywords} in detail.

Main Content:
- Point 1 about ${keywords}
- Point 2 about ${keywords}
- Benefits of ${keywords}

Conclusion:
This is why ${keywords} is important in today's market.
`;

    res.json({ content });

  } catch (error) {
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

router.get("/", (req, res) => {
  res.send("Blog API Working ✅");
});
export default router;