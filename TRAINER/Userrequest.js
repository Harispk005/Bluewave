import React, { useEffect, useState } from 'react'
import './Userrequest.css'
import { Col, Image } from 'react-bootstrap'
import bgc from './bgc.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { set } from 'mongoose'

const Userrequest = () => {
  const nav = useNavigate();
  const [requests, setRequests] = useState([]);

  const lid = sessionStorage.getItem('lid');
  const imgurl = 'http://localhost:8000/';

  useEffect(() => {
    axios.get('http://localhost:8000/trainer/viewrequest', { params: { lid } })
      .then((response) => {
        setRequests(response.data.data);
        console.log(response.data.data);

      })

  }, [])

  


  const accept = (id, newStatus) => {

    axios.post('http://localhost:8000/trainer/acceptrequest_post', { id, status: newStatus });
    setRequests((prevSlots) =>
      prevSlots.map((slot) =>

        slot._id === id ? { ...slot, status: newStatus } : slot

      ));

  }

  const chat = (login) => {
    nav(`/chattrainer/${login}`); // Navigate to chat
  };

  return (
    <div className='userrequest'>

      {/* <h1>User Request</h1> */}
      {requests.map((item) => (
        <div className='userrequestcard'>

          <div className='userrequestcarddiv'>
            <Col xs={6} md={4}>
              <Image src={imgurl + item.image} roundedCircle className='opp' />
            </Col>
          </div>

          <div className='userrequestcarddiv2'>

            <h3 className='nm'>{item.name}</h3>

            <p>Requsted at:{item.requestat}</p>

            <p>Status:{item.status}</p>
          </div>

          <div className='userrequestcarddiv3'>
            {item.status === 'pending' && (
              <>
                <button className='act' onClick={() => accept(item._id, 'accepted')}>Accept</button>

                <button className='dct' onClick={() => accept(item._id, 'declined')}>Decline</button>
              </>
            )}
            {item.status === 'accepted' && (
              <>
                <button className='Chat' onClick={() => chat(item.login._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className='svg' height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" /></svg> Chat</button>
              </>
            )}

          </div>

        </div>
      ))}
    </div>
  )
}

export default Userrequest