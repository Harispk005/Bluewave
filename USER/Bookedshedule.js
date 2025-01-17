import React, { useEffect, useState } from 'react'
import './Viewbooking.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Bookedshedule = () => {
    const nav=useNavigate();

    const[viewbookingdata,setviewbookingdata]=useState([]);
    const lid=sessionStorage.getItem('lid');
  
    useEffect(() => {
          axios.get('http://localhost:8000/user/viewbooking',{params:{lid}})
          .then((response) => {
              setviewbookingdata(response.data.data);
              console.log(lid);
          })
    }, []);
   
  return (
    <div className='viewbooking'>
    <button className="close-modal-btn" onClick={() => nav(-1)}>
  &times;
</button>
    <h1 className='viewbookinghd'>Booked Schedules</h1>
<div className='viewbookingcard'>
    {viewbookingdata.map((item) => (
        
   
   <form className='viewbookingform'>
        <div className='viewbookingformdiv'>
            <label>Booking ID: {item._id}</label>
            <label>Email: {item.email}</label>
            <label>Pool: {item.pools}</label>
            <label>Trainer: {item.trainername}</label>
            <label>Duration: {item.duration}</label>
            <label>Date: {item.date}</label>
            <label>Time: {item.time}</label>
           <label>Payment Status:{item.adminstatus}</label>
        </div>
   </form>
))}

</div>
</div>
  )
}

export default Bookedshedule