import Blog from "../models/blogModel.js";
import axios from "axios";
// 🔥 Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, keywords, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const blog = await Blog.create({
      user: req.user, // must be user id
      title,
      keywords,
      content,
    });

    res.status(201).json(blog);

  } catch (error) {
    console.log("Create Blog Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔥 Get My Blogs
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user }).sort({
      createdAt: -1,
    });

    res.json(blogs);

  } catch (error) {
    console.log("Get Blog Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔥 Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, keywords, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.user.toString() !== req.user.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    blog.title = title || blog.title;
    blog.keywords = keywords || blog.keywords;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();

    res.json(updatedBlog);

  } catch (error) {
    console.log("Update Blog Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔥 Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.user.toString() !== req.user.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await blog.deleteOne();

    res.json({ message: "Blog deleted successfully" });

  } catch (error) {
    console.log("Delete Blog Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};