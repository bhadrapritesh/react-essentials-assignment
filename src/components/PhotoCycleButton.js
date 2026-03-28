import React from 'react';

const PhotoCycleButton = ({ onCycle }) => (
  <button className="photo-cycle-button" onClick={onCycle}>
    Next Photo
  </button>
);

export default PhotoCycleButton;
