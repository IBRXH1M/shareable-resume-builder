// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    profilePicture: '',
    education: '',
    skills: '',
    workExperience: ''
  });
  const [resumeUrl, setResumeUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateResume = async () => {
    const response = await axios.post('http://localhost:3001/create-resume', {
      username: formData.name,
      data: formData,
    });
    setResumeUrl(response.data.resumeUrl);
  };

  const downloadPDF = () => {
    if (resumeUrl) {
      window.open(`http://localhost:3001/download/${resumeUrl.split('/').pop()}`);
    }
  };

  return (
    <div className="container">
      {!resumeUrl ? (
        <div className="form-container">
          <h2>Resume Builder</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateResume();
            }}
          >
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Details:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>Education:</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <div className="form-group">
              <label>Skills:</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <div className="form-group">
              <label>Work Experience:</label>
              <textarea
                name="workExperience"
                value={formData.workExperience}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <button type="submit">Generate Resume</button>
          </form>
        </div>
      ) : (
        <div className="resume-container">
          <h2>Your Resume</h2>
          <div className="resume-section">
            {formData.profilePicture && (
              <img src={formData.profilePicture} alt="Profile" />
            )}
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Contact:</strong> {formData.contact}</p>
            <p><strong>Education:</strong> {formData.education}</p>
            <p><strong>Skills:</strong> {formData.skills}</p>
            <p><strong>Work Experience:</strong> {formData.workExperience}</p>
          </div>
          <div className="actions">
            <button onClick={() => setResumeUrl(null)}>Start Over</button>
            <button onClick={downloadPDF}>Download PDF</button>
            <div className="share-section">
              <h3>Share Your Resume</h3>
              <p>Share this link with others: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">{resumeUrl}</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
