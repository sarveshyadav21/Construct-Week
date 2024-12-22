import React, { useState } from "react";
import "./App.css";
import LoginForm from "./asset/LoginForm";
import ForgotPasswordForm from "./asset/ForgotPasswordForm";
import SignupForm from "./asset/SignUpForm";
import Logo from "./logo.png";
import Dashboard from "./component/Dashboard";
import { AuthProvider, AuthContext } from "./asset/AuthContext";

const App = () => {
  const [activeForm, setActiveForm] = useState("login");

  const handleLogout = () => {
    setActiveForm("login");
  };

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isLoggedIn }) => (
          <>
            <div className="logo-container">
              <img src={Logo} alt="Logo" />
            </div>
            {console.log("isLoggedIn:", isLoggedIn)}
            {console.log("activeForm:", activeForm)}
            {isLoggedIn && activeForm === "dashboard" ? (
              <Dashboard handleLogout={handleLogout} />
            ) : (
              <>
                {activeForm === "login" && <LoginForm setActiveForm={setActiveForm} />}
                {activeForm === "signup" && <SignupForm setActiveForm={setActiveForm} />}
                {activeForm === "forgotPassword" && <ForgotPasswordForm setActiveForm={setActiveForm} />}
              </>
            )}
          </>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;