import React from 'react';

const ThemeSwitcher = ({ theme, onToggle }) => (
  <button className="theme-switcher" onClick={onToggle}>
    Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
  </button>
);

export default ThemeSwitcher;
