import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {

    const savedToken = localStorage.getItem("token");

    setToken(savedToken);

  }, [location]);   // route change hone par navbar update hogi

  const handleLogout = () => {

    localStorage.removeItem("token");

    setToken(null);

    navigate("/login");

  };

  return (

    <nav style={styles.nav}>

      <div style={styles.logo}>SEO SaaS</div>

      <div style={styles.right}>

        {token && (
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        )}

        <div style={styles.dropdownWrapper}>

          <button
            style={styles.accountBtn}
            onClick={() => setOpen(!open)}
          >
            Account ▾
          </button>

          {open && (

            <div style={styles.dropdown}>

              {!token && (
                <>
                  <Link to="/login" style={styles.link} onClick={() => setOpen(false)}>
                    Login
                  </Link>

                  <Link to="/register" style={styles.link} onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </>
              )}

              {token && (
                <>
                  <Link to="/dashboard" style={styles.link} onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
<Link to="/ai-tool" style={styles.link}>
AI Tool
</Link>
                  <div style={styles.link} onClick={handleLogout}>
                    Logout
                  </div>
                </>
              )}

            </div>

          )}

        </div>

      </div>

    </nav>

  );
}

const styles = {

  nav:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"15px 40px",
    background:"#1e3a8a",
    color:"white"
  },

  logo:{
    fontSize:"20px",
    fontWeight:"bold"
  },

  right:{
    display:"flex",
    alignItems:"center",
    gap:"15px"
  },

  logout:{
    background:"#ef4444",
    border:"none",
    padding:"8px 14px",
    color:"white",
    borderRadius:"6px",
    cursor:"pointer"
  },

  dropdownWrapper:{
    position:"relative"
  },

  accountBtn:{
    background:"white",
    color:"#1e3a8a",
    padding:"8px 14px",
    borderRadius:"6px",
    border:"none",
    cursor:"pointer",
    fontWeight:"600"
  },

  dropdown:{
    position:"absolute",
    right:0,
    top:"45px",
    background:"white",
    borderRadius:"8px",
    boxShadow:"0 4px 10px rgba(0,0,0,0.2)",
    display:"flex",
    flexDirection:"column",
    minWidth:"150px"
  },

  link:{
    padding:"10px 15px",
    textDecoration:"none",
    color:"#333",
    borderBottom:"1px solid #eee",
    cursor:"pointer"
  }

};