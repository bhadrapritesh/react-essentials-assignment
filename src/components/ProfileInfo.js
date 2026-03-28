import React from 'react';

const ProfileInfo = ({ name, title, bio }) => (
  <div className="profile-info">
    <h2>{name}</h2>
    <h4>{title}</h4>
    <p>{bio}</p>
  </div>
);

export default ProfileInfo;
