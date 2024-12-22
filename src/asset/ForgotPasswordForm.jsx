import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./FormStyles.css";

const ForgotPasswordForm = ({ setActiveForm }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { forgotPassword } = useContext(AuthContext);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    const response = await forgotPassword(email);
    if (!response.success) {
      setError(response.message);
    } else {
      setError(""); // Clear any previous errors
      alert("Password reset link sent to your email.");
      setActiveForm("login");
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className="form-container">
      <h2>Forgot Password</h2>
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
      <button type="submit" className="form-button">Send Reset Link</button>
      <div className="form-links">
        <button type="button" className="form-button" onClick={() => setActiveForm("login")}>Back to Login</button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;