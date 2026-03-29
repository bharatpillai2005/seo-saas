import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password
    });

    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account ✨</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
        <div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁"}
  </span>
</div>
        </div>

        <button onClick={handleRegister}>Register</button>

        <div className="link-text">
          Already have account?{" "}
          <span onClick={()=>navigate("/")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}