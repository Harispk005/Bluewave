import React, { useEffect, useState } from 'react';
import './Viewtrainerbookings.css';
import axios from 'axios';

const Viewtrainerbookings = () => {
  const [viewbookings, setViewbookings] = useState([]);
  const lid = sessionStorage.getItem('lid');

  useEffect(() => {
    axios
      .get('http://localhost:8000/trainer/gettrainerbookings', { params: { lid } })
      .then((response) => {
        setViewbookings(response.data.data);
        console.log('Fetched bookings:', response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching trainer bookings:', error);
      });
  }, []);

  return (
    <div className="viewtrainerbookings">
      {viewbookings.length > 0 ? (
        viewbookings.map((booking, index) => (
          <div className="viewtrainerbookingscontainer" key={index}>
            <div className="viewtrainerbookingsdiv">
              <p><strong>Booking ID:</strong> {booking._id}</p>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Pool:</strong> {booking.pools}</p>
              <p><strong>Duration:</strong> {booking.duration}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Amount:</strong> ₹ {booking.amount}</p>
              <p><strong>Admin Status:</strong> {booking.adminstatus}</p>
              <p><strong>Trainer Status:</strong> {booking.trainerstatus}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-bookings-message">No bookings available or still loading...</p>
      )}
    </div>
  );
};

export default Viewtrainerbookings;
