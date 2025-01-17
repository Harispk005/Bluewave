import React, { useEffect, useState } from 'react';
import './Viewreviews.css';
import { Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from 'react-rating-stars-component';

const Viewreviews = () => {
  const nav = useNavigate();
  const imgurl = 'http://localhost:8000/';
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/getreviews')
      .then((response) => {
        setReviews(response.data.data);
      });
  }, []);

  return (
    <body className="viewreviews">
      <button className="close-modal-btn" style={{ color: 'white' }} onClick={() => nav(-1)}>
        &times;
      </button>
      <div className="base">
        {reviews.map((item, index) => (
          <form key={index} className="viewreviewsform">
            <Col xs={6} md={4}>
              <Image src={imgurl + item.image} className="gmi" roundedCircle />
            </Col>
            <h2 className="name">{item.name}</h2>
            <div className="review-container">
            <h5 className="rating">
                Rating: 
                <Rating
                  count={5}
                  value={item.rating}
                  size={20}
                  activeColor="#ffd700"
                  isHalf={true}
                  edit={false} // Makes the stars non-editable (view only)
                />
              </h5>
              <h5 className="review">Review: {item.feedback}</h5>
            </div>
          </form>
        ))}
      </div>
    </body>
  );
};

export default Viewreviews;
