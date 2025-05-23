import React from 'react';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
      <style jsx>{`
        .star-rating {
          display: inline-block;
          font-size: 24px;
        }
        .star {
          color: #ddd;
          cursor: pointer;
          margin-right: 5px;
        }
        .star.filled {
          color: #ffc107;
        }
      `}</style>
    </div>
  );
};

export default StarRating;