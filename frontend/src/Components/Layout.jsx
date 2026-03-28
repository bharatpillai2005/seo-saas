
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{
      display: "flex",
      background: darkMode ? "#0f172a" : "#f1f5f9",
      minHeight: "100vh"
    }}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div style={{
        marginLeft: "260px",
        padding: "40px",
        width: "100%",
        color: darkMode ? "white" : "black"
      }}>
        {children}
      </div>
    </div>
  );
}