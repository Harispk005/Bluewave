import React, { useEffect, useState } from 'react'
import './Viewcomplaint.css'
import { Col, Image } from 'react-bootstrap'
import bg from './background.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Replymodal from './Replymodal'

const Viewcomplaint = () => {
  const nav = useNavigate();
  const imgurl = 'http://localhost:8000/';
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {


    axios.get('http://localhost:8000/getcomplaints')
      .then((response) => {
        setComplaints(response.data.data);
      });
  }, []);







  return (
    <body className='bll'>
      <button className="close-modal-btn" style={{ color: 'white' }} onClick={() => nav(-1)}>
        &times;
      </button>
      {complaints.map((item, index) => (
        <form className='complform'>


          <div>
            <Col xs={6} md={4}>
          <Image src={imgurl + item.image} className='prpic' roundedCircle /> 
          
        </Col>
            <h2>{item.name}</h2>
            <h5>{item.date}</h5>
            <label>Complaint ID:{item._id}</label>
            <label>User ID: {item.login}</label>
           
           

          </div>
          <label className='newdiv'>Complaint:</label>
          <div className='complaint-box'>
            <p>{item.complaint}</p>
          </div>
         
            <Replymodal id={item._id} replydata={item.reply} />
         


        </form>
      ))}

    </body>

  )
}

export default Viewcomplaint