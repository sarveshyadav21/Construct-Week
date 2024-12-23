import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../asset/AuthContext";
import "./Dashboard.css";

const Dashboard = ({ handleLogout }) => {
  const { user, getResumes, logout } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("home");
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(0);
  const [uploadHistory, setUploadHistory] = useState([]);

  useEffect(() => {
    const fetchUploadHistory = async () => {
      const response = await getResumes();
      if (response.success) {
        setUploadHistory(response.resumes);
      } else {
        console.error(response.message);
      }
    };

    fetchUploadHistory();
  }, [getResumes]);

  const handleLogoutClick = () => {
    logout();
    handleLogout();
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    // Simulate scoring the resume
    setScore(Math.floor(Math.random() * 100) + 1);
    // Add to upload history
    setUploadHistory([...uploadHistory, { name: uploadedFile.name, date: new Date().toISOString().split('T')[0] }]);
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <button onClick={() => setActiveSection("home")}>Home</button>
        <button onClick={() => setActiveSection("templates")}>Templates</button>
        <button onClick={() => setActiveSection("profile")}>Profile</button>
        <button onClick={handleLogoutClick}>Logout</button>
      </nav>

      {activeSection === "home" && (
        <div className="home-section">
          <h1>Welcome to the Dashboard</h1>
          <h2>Upload a Resume</h2>
        </div>
      )}

      {activeSection === "templates" && (
        <div className="templates-section">
          <h1>Templates</h1>
          <ul>
            <li><a href="/path/to/ATS_Classic_HR_Resume.pdf" download>ATS Classic HR Resume</a></li>
            <li><a href="/path/to/Color_Block_Resume.pdf" download>Color Block Resume</a></li>
            <li><a href="/path/to/Industry_Manager_Resume.pdf" download>Industry Manager Resume</a></li>
          </ul>
        </div>
      )}

      {activeSection === "profile" && (
        <div className="profile-section">
          <h1>Profile</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <h2>Upload History</h2>
          <ul>
            {uploadHistory.map((file, index) => (
              <li key={index}>
                <a href={file.url} download>{file.name}</a> - {file.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;