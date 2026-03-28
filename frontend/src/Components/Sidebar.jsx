import { useState } from "react";

export default function Sidebar({ darkMode, setDarkMode }) {
  return (
    <div style={{
      ...styles.sidebar,
      background: darkMode ? "#111827" : "#1e3a8a"
    }}>
      <h2 style={styles.logo}>SEO SaaS</h2>

      <button
        style={styles.toggle}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "95vh",
    margin: "15px",
    borderRadius: "18px",
    padding: "25px",
    position: "fixed",
    color: "white",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
  },
  logo: {
    marginBottom: "40px",
  },
  toggle: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};
