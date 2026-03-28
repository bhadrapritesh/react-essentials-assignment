import MovieExplorer from './MovieExplorer';

import React, { useState } from 'react';
import './App.css';
import ProfileImage from './components/ProfileImage';
import SkillBadges from './components/SkillBadges';

import profilePhotos from './profilePhotos';

import profiles from './profiles';


function App() {
  const [theme, setTheme] = useState('light');
  const [profileIdx, setProfileIdx] = useState(0);
  const [likes, setLikes] = useState(0);
  const [view, setView] = useState('card'); // 'card' or 'movies'

  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const handlePrevPhoto = () => setProfileIdx((profileIdx - 1 + profiles.length) % profiles.length);
  const handleNextPhoto = () => setProfileIdx((profileIdx + 1) % profiles.length);
  const handleLike = () => setLikes(likes + 1);
  const handleContact = () => alert('Contact button clicked!');

  const { name, title, bio, skills } = profiles[profileIdx];

  return (
    <div className={`portfolio-app ${theme}`}>
      <div className="top-menu">
        <button
          className={`top-menu-btn${view === 'card' ? ' active' : ''}`}
          onClick={() => setView('card')}
        >
          Portfolio Card
        </button>
        <button
          className={`top-menu-btn${view === 'movies' ? ' active' : ''}`}
          onClick={() => setView('movies')}
        >
          Movie Explorer
        </button>
        <span className="theme-toggle top-menu-toggle" onClick={handleThemeToggle} title="Toggle theme">
          <span role="img" aria-label="theme">{theme === 'dark' ? '🌙' : '☀️'}</span> Toggle theme
        </span>
      </div>
      {view === 'card' && (
        <div className="portfolio-card">
          <div className="profile-main-row">
            <ProfileImage src={profilePhotos[profileIdx % profilePhotos.length]} alt="Profile" />
            <div className="profile-info">
              <h2 className="profile-name">{name}</h2>
              <h4 className="profile-title">{title}</h4>
            </div>
          </div>
          <div className="profile-bio-section">
            <p className="profile-bio">
              {bio}
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
              <button className="nav-arrow" onClick={handlePrevPhoto} aria-label="Previous profile">&#60;</button>
              <button className="nav-arrow" onClick={handleNextPhoto} aria-label="Next profile">&#62;</button>
              <span className="photo-count">{profileIdx + 1} / {profiles.length}</span>
              <span className="like-section" onClick={handleLike} title="Like">
                <span role="img" aria-label="like">&#10084;</span> {likes}
              </span>
            </div>
            <button className="contact-btn" onClick={handleContact}>
              <span role="img" aria-label="contact">&#9993;</span> Contact
            </button>
          </div>
        </div>
      )}
      {view === 'movies' && (
        <MovieExplorer theme={theme} onToggleTheme={handleThemeToggle} />
      )}
    </div>
  );
}

export default App;
