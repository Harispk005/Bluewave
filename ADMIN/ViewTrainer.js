import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewTrainer.css'
import { Col, Image } from 'react-bootstrap';

const ViewTrainer = () => {
    const[ViewTrainer,setViewTrainer]=useState([]);
    const imgurl = 'http://localhost:8000/';
    const nav = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/gettrainers')
        .then((response) => {
          setViewTrainer(response.data.data);
      
        })
    },[])

   

  return (
    <body className='vtr'>

<button className="close-modal-btn" style={{color:"white"}} onClick={() => nav(-1)}>
          &times;
        </button>
        
            
        {ViewTrainer.map((item) => (
            
      
        <div className='mnbvc'>
            <div className='ls'>
            <Col xs={6} md={1}>
            <Image src={imgurl+item.image} className="imgg" roundedCircle  />
            </Col>
            </div>
            <div className='md'>
                <h3>{item.name}</h3>
                <p className='em'>Trainer ID:{item._id}</p>
                <p className='em'>email:{item.email}</p>
                <p className='em'>Phone:{item.phone}</p>
                <p className='em'>Age:{item.age}</p>
                <p className='em'>Qualification:{item.qualification}</p>
                <p className='em'>Gender:{item.gender}</p>
                <p className='em'>Login ID:{item.login}</p>
            </div>
           
        </div>
  ))}
    </body>
  )
}


export default ViewTrainer