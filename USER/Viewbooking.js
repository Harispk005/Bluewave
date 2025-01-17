import React, { useEffect, useState } from 'react';
import './Viewbooking.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Viewbooking = () => {
  const nav = useNavigate();
  const [viewbookingdata, setviewbookingdata] = useState([]);

  const lid = sessionStorage.getItem('lid');

  useEffect(() => {
    axios
      .get('http://localhost:8000/user/viewbooking', { params: { lid } })
      .then((response) => {
        setviewbookingdata(response.data.data);
        console.log(response.data.data);
      });
  }, []);

  // Load Razorpay script function
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Pay function that integrates Razorpay
  const pay = async (amount, bookingid) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_jPprW4DUbqmqQD', // Your Razorpay API key
      amount: parseInt(amount * 100), // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'Booking Payment',
      description: 'Test Transaction',
      handler: async function (response) {
       
        
      console.log(lid, amount, response.razorpay_payment_id , bookingid);

      try{
        const res = await axios.get('http://localhost:8000/user/savepayment', {
          params: {
            login: lid,
            amount: amount,
            bookingid: bookingid,
            status:"success",
          },
        });

        if (res.data.status === 'successpayment') {
          alert('Payment successful');
          window.location.reload();
        }

      }
      catch(error){
        console.error(error);
      }
        
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: 'your-contact-number',
      },
      notes: {
        address: 'India',
      },
      theme: {
        color: '#158993',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className='viewbooking'>
      <button className="close-modal-btn" onClick={() => nav('/')}>
        &times;
      </button>
      <h1 className='viewbookinghd'>Your Bookings</h1>
      <div className='viewbookingcard'>
        {viewbookingdata.map((item) => (
          <form className='viewbookingform' key={item._id}>
            <div className='viewbookingformdiv'>
              <label>Booking ID: {item._id}</label>
              <label>Email: {item.email}</label>
              <label>Pool: {item.pools}</label>
              <label>Trainer: {item.trainername}</label>
              <label>Duration: {item.duration}</label>
              <label>Amount: {item.amount}</label>
              <label>Date: {item.date}</label>
              <label>Time: {item.time}</label>
              <label>Status, Admin: {item.adminstatus}</label>
              <label>Status, Trainer: {item.trainerstatus}</label>
            </div>
            {item.adminstatus === 'Accepted' && item.trainerstatus === 'Accepted' && (
              <button
                type='button'
                className='paynow'
                onClick={() => pay(item.amount, item._id)} 
              >
                Pay Now
              </button>
            )}
          </form>
        ))}
      </div>
    </div>
  );
};

export default Viewbooking;
