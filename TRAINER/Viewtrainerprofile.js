import React, { useEffect, useState } from 'react'
import './Viewtrainerprofile.css'
import { Col, Image } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Viewtrainerprofile = () => {
const[image,setImage]=useState('');
const[name,setName]=useState('');
const[id,setId]=useState('');
const[email,setEmail]=useState('');
const[phone,setPhone]=useState('');
const[age,setAge]=useState('');
const[qualification,setQualification]=useState('');
const[experience,setExperience]=useState('');

const imgurl='http://localhost:8000/';

const nav=useNavigate();
const lid=sessionStorage.getItem('lid');
useEffect(()=>{
    console.log(lid);
    
})

useEffect(()=>{
   


    
    
    axios.get('http://localhost:8000/trainer/trainerprofile', {params:{lid}})
    .then((response) => {
      console.log(response.data.data);
      
            setImage(response.data.data.image);
            setName(response.data.data.name);
            setId(response.data.data._id);
            setEmail(response.data.data.email);
            setPhone(response.data.data.phone);
            setAge(response.data.data.age);
            setQualification(response.data.data.qualification);
            setExperience(response.data.data.experience);
   
        
    })
},[]);

    return (
        <div className='viewtrainerprofile'>

            <div className='ttt'>
                <div className='ppp'>
                    <Col xs={6} md={4}>
                        <Image src={imgurl+image} className='vvv' roundedCircle />
                    </Col>
                </div>
                <div className='nnn'>

                    <h3 className='trname'>{name}</h3>
                    <br />
                    <p>ID: {id}</p>
                    <p>Email: {email}</p>
                    <p>Phone: {phone}</p>
                    <p>Age: {age}</p>
                    <p>Qualification: {qualification}</p>
                    <p>Expiriance: {experience}</p>



                </div>

            </div>


        </div>
    )
}

export default Viewtrainerprofile