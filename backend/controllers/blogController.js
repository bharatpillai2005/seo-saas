import Blog from "../models/blogModel.js";


// 🔥 CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { title, keywords, content } = req.body;

    // validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    // create blog
    const blog = await Blog.create({
      title,
      keywords,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.log("Create Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// 🔥 GET ALL BLOGS
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });

  } catch (error) {
    console.log("Get Blogs Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// 🔥 UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { title, keywords, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // update fields
    blog.title = title || blog.title;
    blog.keywords = keywords || blog.keywords;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });

  } catch (error) {
    console.log("Update Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// 🔥 DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.log("Delete Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};