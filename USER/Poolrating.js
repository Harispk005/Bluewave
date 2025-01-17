import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import axios from 'axios';
import './Ratingstar.css';

const Poolrating = ({id} ) => {
    
    
    const[rating,setRating]= useState(0);
    const[feedback,setFeedback]= useState('');

const handleRatingChange = (newRating) => {
  setRating(newRating);
};





const handleSubmit = async () => {
 
    const lid = sessionStorage.getItem('lid');
    const pid=id;
    try {
        const response = await axios.post('http://localhost:8000/user/poolrating_post', {
          lid,
          pid,
          rating,
          feedback,
        });
        if (response.data.status === 'successpoolrating') {
          alert('Thank you for your Valuable feedback');
          setRating(0);
          setFeedback('');
          window.location.reload();
        } else {
          alert('Failed to submit feedback. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred while submitting feedback. Please try again.');
      }
      

};

  return (
    <div>

        <Rating
        count={5}
        value={rating}
        size={30}
        activeColor="#ffd700"
        isHalf={true} 
        onChange={handleRatingChange}
      />
        <div className="rating-value">
        <p>Your Rating: {rating} / 5</p>
      </div>

        <div className="feedback-input">
  <textarea
    className="feedback-textarea"
    placeholder="Enter your feedback here"
    value={feedback}
    onChange={(e) => setFeedback(e.target.value)}
  ></textarea>
  <button type="submit" className="feedback-button" onClick={handleSubmit}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
    >
      <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
    </svg>
  </button>
</div>
    </div>
  )
}

export default Poolrating