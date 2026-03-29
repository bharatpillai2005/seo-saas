import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogModal({ closeModal, refresh, editData }) {
  const [form, setForm] = useState({
    title: "",
    keywords: "",
    content: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const saveBlog = async () => {
    try {
      if (editData) {
        await axios.put(
          `http://localhost:5000/api/blog/${editData._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/blog/create",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      refresh();
      closeModal();
    } catch {
      alert("Save failed");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{editData ? "Edit Blog" : "Create Blog"}</h2>

        <input
          placeholder="Title"
          value={form.title}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Keywords"
          value={form.keywords}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, keywords: e.target.value })
          }
        />

        <textarea
          placeholder="Content"
          value={form.content}
          style={styles.textarea}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <button style={styles.saveBtn} onClick={saveBlog}>
          {editData ? "Update" : "Save"}
        </button>

        <button style={styles.close} onClick={closeModal}>
          ✖
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "400px",
    position: "relative"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px"
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px"
  },
  saveBtn: {
    background: "#2563eb",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "15px",
    border: "none",
    background: "transparent",
    cursor: "pointer"
  }
};