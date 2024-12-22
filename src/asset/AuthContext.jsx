import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://resume-builder-dx6w.onrender.com/login", { email, password });
      if (response.data.success) {
        setIsLoggedIn(true);
        setUser({ email });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: "An error occurred. Please try again." };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post("https://resume-builder-dx6w.onrender.com/signup", { name, email, password });
      if (response.data.success) {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: "An error occurred. Please try again." };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post("https://resume-builder-dx6w.onrender.com/forgot-password", { email });
      if (response.data.success) {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: "An error occurred. Please try again." };
    }
  };

  const uploadResume = async (file) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("email", user.email);

      const response = await axios.post("https://resume-builder-dx6w.onrender.com/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Resume uploaded successfully") {
        return { success: true, resumePath: response.data.resumePath };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: "An error occurred. Please try again." };
    }
  };

  const getResumes = async () => {
    try {
      const response = await axios.get("https://resume-builder-dx6w.onrender.com/get-resumes", {
        params: { email: user.email },
      });

      if (response.data.resumes) {
        return { success: true, resumes: response.data.resumes };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: "An error occurred. Please try again." };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, signup, forgotPassword, uploadResume, getResumes, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};