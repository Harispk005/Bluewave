import React, { useEffect, useState } from 'react'
import './Viewusers.css'
import { Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Viewusers = () => {
    const nav=useNavigate();
    const[viewusers,setviewusers]=useState([]);
    const imgurl = 'http://localhost:8000/';

    useEffect(() => {
     axios.get('http://localhost:8000/getusers')
     .then((response) => {
       setviewusers(response.data.data);
       console.log(response.data.data);
       
     })   
    },[])

    const removeuser=(id)=>{
        axios.get('http://localhost:8000/deleteuser',{params:{id:id}})
        .then((response) => {
            if(response.data.status === "sucessdeleteuser"){
                alert("User deleted successfully");
                window.location.reload();
            }
        })
    }

  return (
    <body className='usbd'>

<button className="close-modal-btn" style={{color:"white"}} onClick={() => nav(-1)}>
          &times;
        </button>
        {viewusers.map((item) => (
            
        
        <div className='uccon'>
            <div className='ls'>
            <Col xs={6} md={1}>
            <Image src={imgurl + item.image} className="imgg" roundedCircle  />
            </Col>
            </div>
            <div className='md'>
                <h3>{item.name}</h3>
                <p className='em'>User ID:{item._id}</p>
                <p className='em'>UserName:{item.login ?.username}</p>
                <p className='em'>email:{item.email}</p>
                <p className='em'>Phone:{item.phone}</p>
                <p className='em'>Login ID:{item.login?._id}</p>
            </div>
            <div className='rs'>
                <button className='vwbtn' onClick={()=>removeuser(item._id)}>Remove User</button>
            </div>
        </div>
))}
    </body>
  )
}

export default Viewusers