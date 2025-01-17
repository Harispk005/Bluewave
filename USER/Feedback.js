import React, { useState } from 'react'
import Rating from './Ratingstar'
import './Feedback.css'
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const nav = useNavigate();
 
  
  return (
    <div className='feedback'>
      <button className='close-modal-btn' onClick={() =>nav(-1)}>&times;</button>

      <div className='portions'>

        <div className='hddd'>
          <h1 className='feedbackhd'>Feedback</h1>
          <p className='feedbackp'>
          We value your feedback and would love to hear your thoughts! Please take a moment to rate our services and share any suggestions. Your input helps us improve and serve you better. Thank you for being a part of our journey!</p>

        </div>
        
        <div className='feedbackform'>
     <Rating/>
     </div>

      </div>
    
    
    </div>
  )
}

export default Feedback;