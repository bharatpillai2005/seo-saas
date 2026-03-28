import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Forgot Password</h2>

        {message && <div style={{color:"green"}}>{message}</div>}
        {error && <div style={{color:"red"}}>{error}</div>}

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}