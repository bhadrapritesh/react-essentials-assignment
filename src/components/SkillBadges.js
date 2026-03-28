import React from 'react';

const SkillBadges = ({ skills }) => (
  <div className="skill-badges">
    {skills.map((skill, idx) => (
      <span className="skill-badge" key={idx}>{skill}</span>
    ))}
  </div>
);

export default SkillBadges;
