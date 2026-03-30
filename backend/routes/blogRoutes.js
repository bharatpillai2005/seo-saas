import express from "express";
import {
  createBlog,
  getMyBlogs,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();


// 🔥 TEST ROUTE (browser check)
router.get("/", (req, res) => {
  res.json({ message: "Blog API Working ✅" });
});


// 🔥 AI Content Generate Route (NO AUTH)
router.post("/generate", async (req, res) => {
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


// ✅ Create Blog (NO AUTH)
router.post("/create", createBlog);

// ✅ Get Blogs (NO AUTH)
router.get("/my-blogs", getMyBlogs);

// ✅ Update Blog (NO AUTH)
router.put("/:id", updateBlog);

// ✅ Delete Blog (NO AUTH)
router.delete("/:id", deleteBlog);


export default router;