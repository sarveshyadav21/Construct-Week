import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./FormStyles.css";

const SignupForm = ({ setActiveForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    const response = await signup(name, email, password);
    if (!response.success) {
      setError(response.message);
    } else {
      setError(""); // Clear any previous errors
      alert("Signup successful. Please log in.");
      setActiveForm("login");
    }
  };

  return (
    <form onSubmit={handleSignup} className="form-container">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <button type="submit" className="form-button">Sign Up</button>
      <div className="form-links">
        <button type="button" className="form-button" onClick={() => setActiveForm("login")}>Back to Login</button>
      </div>
    </form>
  );
};

export default SignupForm;