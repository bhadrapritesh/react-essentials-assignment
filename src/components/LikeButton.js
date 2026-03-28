import React from 'react';

const LikeButton = ({ likes, onLike }) => (
  <button className="like-button" onClick={onLike}>
    👍 Like {likes > 0 && <span>({likes})</span>}
  </button>
);

export default LikeButton;
