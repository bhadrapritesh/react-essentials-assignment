import React from 'react';

const AlertButton = ({ message }) => (
  <button className="alert-button" onClick={() => alert(message)}>
    Show Alert
  </button>
);

export default AlertButton;
