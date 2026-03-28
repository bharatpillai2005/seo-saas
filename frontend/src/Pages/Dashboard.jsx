import { useEffect, useState } from "react";
import axios from "axios";
import BlogModal from "../components/BlogModal";

export default function Dashboard() {

  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  const token = localStorage.getItem("token");

  // LOGIN CHECK
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // FETCH BLOGS
  const fetchBlogs = async () => {
    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/blog/my-blogs",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBlogs(res.data);

    } catch (err) {

      console.log(err);
      setError("Failed to load blogs");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // DELETE BLOG
  const deleteBlog = async (id) => {

    const confirmDelete = window.confirm("Delete this blog?");

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchBlogs();

    } catch {

      setError("Delete failed");

    }
  };

  // AI ANALYZE
  const analyzeKeyword = async () => {

    const res = await fetch("http://localhost:5000/api/ai/analyze",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        keyword: keyword
      })
    });

    const data = await res.json();

    setResult(data.data);
  };

  // GENERATE BLOG
  const generateBlog = async () => {

    const res = await fetch("http://localhost:5000/api/ai/generate-blog",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        keyword: keyword
      })
    });

    const data = await res.json();

    setResult(data.data);
  };

  return (

    <div style={darkMode ? styles.darkContainer : styles.container}>

      {/* TOP BAR */}
      <div style={styles.topBar}>

        <h2>My Blogs</h2>

        <div>

          <button
            style={styles.toggle}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            style={styles.createBtn}
            onClick={() => {

              setEditData(null);
              setShowModal(true);

            }}
          >
            + Create Blog
          </button>

        </div>

      </div>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* BLOG GRID */}
      <div style={styles.grid}>

        {blogs.map((blog) => (

          <div
            key={blog._id}
            style={darkMode ? styles.darkCard : styles.card}
          >

            <h3>{blog.title}</h3>

            <p style={styles.keyword}>{blog.keywords}</p>

            <p>{blog.content?.substring(0, 120)}...</p>

            <div style={styles.cardBtns}>

              <button
                style={styles.editBtn}
                onClick={() => {

                  setEditData(blog);
                  setShowModal(true);

                }}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteBlog(blog._id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* AI TOOL */}
      <div style={styles.aiTool}>

        <h2>AI SEO Tool</h2>

        <input
          type="text"
          placeholder="Enter SEO keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />

        <div>

          <button
            onClick={analyzeKeyword}
            style={styles.analyzeBtn}
          >
            Analyze Keyword
          </button>

          <button
            onClick={generateBlog}
            style={styles.generateBtn}
          >
            Generate SEO Blog
          </button>

        </div>

        {result && (

          <div style={styles.aiBox}>

            <div style={styles.aiHeader}>
              AI Generated Result
            </div>

            <div style={styles.aiContent}>
              {result}
            </div>

          </div>

        )}

      </div>

      {/* MODAL */}
      {showModal && (

        <BlogModal
          closeModal={() => setShowModal(false)}
          refresh={fetchBlogs}
          editData={editData}
        />

      )}

    </div>

  );

}

const styles = {

  container: {
    padding: "40px",
    background: "#f3f4f6",
    minHeight: "100vh"
  },

  darkContainer: {
    padding: "40px",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px"
  },

  toggle: {
    marginRight: "10px",
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  },

  createBtn: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  darkCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px"
  },

  keyword: {
    fontSize: "14px",
    color: "#2563eb"
  },

  cardBtns: {
    marginTop: "15px",
    display: "flex",
    gap: "10px"
  },

  editBtn: {
    background: "#f59e0b",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white"
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white"
  },

  aiTool: {
    marginTop: "60px",
    maxWidth: "900px"
  },

  input: {
    padding: "12px",
    width: "350px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  analyzeBtn: {
    marginLeft: "10px",
    padding: "10px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  generateBtn: {
    marginLeft: "10px",
    padding: "10px 16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  aiBox: {
    marginTop: "20px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    overflow: "hidden"
  },

  aiHeader: {
    background: "#111827",
    color: "white",
    padding: "14px 20px",
    fontWeight: "600"
  },

  aiContent: {
    padding: "25px",
    lineHeight: "1.7",
    fontSize: "15px",
    color: "#1f2937",
    maxHeight: "500px",
    overflowY: "auto",
    whiteSpace: "pre-wrap"
  }

};