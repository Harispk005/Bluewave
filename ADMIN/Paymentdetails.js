import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Image } from 'react-bootstrap'

const Paymentdetails = () => {
    const[paymentdetails,setpaymentdetails]= useState([]);
    const imgurl='http://localhost:8000/';

    useEffect(() => {
        axios.get('http://localhost:8000/paymentdetails')
        .then((response) => {
            setpaymentdetails(response.data.data);
            console.log(response.data.data);
            
        })
    },[])
  return (
    <div className="manage-users">
      
    <header className="admin-header">
   
    </header>


    <div className="table-container">
<table className="user-table">
  <thead>
    <tr>
      <th>Username</th>
      <th>User ID</th>
      <th>Booking ID</th>
      <th>Payment ID</th>
      <th>Date</th>
      <th>Amount</th>
      <th></th>
    </tr>
  </thead>
  {paymentdetails.map((item) => (
      

  <tbody>
    
        <tr key={item.id} className="trai">
         <td>{item.login.username}</td>
         <td>{item.login._id}</td>
         <td>{item.booking}</td>
         <td>{item._id}</td>
         <td>{item.date}</td>
         <td>{item.amount}</td>
         

        </tr>

  </tbody>
    ))}
</table>
</div>

  
  </div>
  )
}

export default Paymentdetails