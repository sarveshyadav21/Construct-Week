import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../asset/AuthContext";
import "./Dashboard.css";

const Dashboard = ({ handleLogout }) => {
  const { logout } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("home");
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(0);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [user, setUser] = useState({ name: "John Doe", email: "john.doe@example.com" });

  useEffect(() => {
    // Fetch user data and upload history from the server
    // For now, we use static data
    setUser({ name: "John Doe", email: "john.doe@example.com" });
    setUploadHistory([
      { name: "Resume1.pdf", date: "2023-01-01" },
      { name: "Resume2.docx", date: "2023-02-15" },
    ]);
  }, []);

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
          <h1>Welcome to the Resume Editor</h1>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
          {file && (
            <div>
              <p>Uploaded File: {file.name}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${score}%` }}>
                  {score}%
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === "templates" && (
        <div className="templates-section">
          <h2>Resume Templates</h2>
          <div className="templates">
            <div className="template">Template 1</div>
            <div className="template">Template 2</div>
            <div className="template">Template 3</div>
          </div>
        </div>
      )}

      {activeSection === "profile" && (
        <div className="profile-section">
          <h2>Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <h3>Upload History</h3>
          <ul>
            {uploadHistory.map((file, index) => (
              <li key={index}>
                {file.name} - {file.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;