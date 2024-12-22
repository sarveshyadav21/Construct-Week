import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./FormStyles.css";

const LoginForm = ({ setActiveForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.success) {
      setActiveForm("dashboard");
    } else {
      setError(response.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="form-button">Login</button>
      <div className="form-links">
        <button type="button" className="form-button" onClick={() => setActiveForm("signup")}>Sign Up</button>
        <button type="button" className="form-button" onClick={() => setActiveForm("forgotPassword")}>Forgot Password</button>
      </div>
    </form>
  );
};

export default LoginForm;