
import React, { useState } from 'react';
import './App.css';
import ProfileImage from './components/ProfileImage';
import SkillBadges from './components/SkillBadges';
import profilePhotos from './profilePhotos';

const skills = [
  'Design Systems',
  'React',
  'TypeScript',
  'Figma',
  'Prototyping',
  'Accessibility',
];

function App() {
  const [theme, setTheme] = useState('light');
  const [photoIdx, setPhotoIdx] = useState(0);
  const [likes, setLikes] = useState(0);

  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const handlePrevPhoto = () => setPhotoIdx((photoIdx - 1 + profilePhotos.length) % profilePhotos.length);
  const handleNextPhoto = () => setPhotoIdx((photoIdx + 1) % profilePhotos.length);
  const handleLike = () => setLikes(likes + 1);
  const handleContact = () => alert('Contact button clicked!');

  return (
    <div className={`portfolio-app ${theme}`}>
      <div className="portfolio-card">
        <div className="card-header">
          <span className="theme-toggle" onClick={handleThemeToggle} title="Toggle theme">
            <span role="img" aria-label="theme">{theme === 'dark' ? '🌙' : '☀️'}</span> Toggle theme
          </span>
        </div>
        <div className="profile-main-row">
          <ProfileImage src={profilePhotos[photoIdx]} alt="Profile" />
          <div className="profile-info">
            <h2 className="profile-name">TuteDude</h2>
            <h4 className="profile-title">Product Designer & Frontend Engineer</h4>
          </div>
        </div>
        <div className="profile-bio-section">
          <p className="profile-bio">
            I design and build calm, focused product experiences for fast-moving teams. Currently exploring AI-assisted interfaces, design systems, and high-performance UI engineering.
          </p>
        </div>
        <div className="skills-section">
          <div className="skills-label">Skills</div>
          <SkillBadges skills={skills} />
        </div>
        <div className="card-footer">
          <div className="footer-left">
            <span className="theme-status">
              <span role="img" aria-label="theme">{theme === 'dark' ? '🌙' : '☀️'}</span> {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>
            <button className="nav-arrow" onClick={handlePrevPhoto} aria-label="Previous photo">&#60;</button>
            <button className="nav-arrow" onClick={handleNextPhoto} aria-label="Next photo">&#62;</button>
            <span className="photo-count">{photoIdx + 1} / {profilePhotos.length}</span>
            <span className="like-section" onClick={handleLike} title="Like">
              <span role="img" aria-label="like">&#10084;</span> {likes}
            </span>
          </div>
          <button className="contact-btn" onClick={handleContact}>
            <span role="img" aria-label="contact">&#9993;</span> Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
