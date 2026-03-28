import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.topbar}>
      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  topbar: {
    marginLeft: "220px",
    padding: "15px 30px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "flex-end",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  logout: {
    background: "#ef4444",
    border: "none",
    padding: "8px 16px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};