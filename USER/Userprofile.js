import React, { useEffect, useState } from 'react';
import './Userprofile.css';
import axios from 'axios';
import Edit from './Edit';
import Changepass from './Changepass';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

const Userprofile = () => {
  const imgurl = 'http://localhost:8000/';
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const lid = sessionStorage.getItem('lid');
    axios.get('http://localhost:8000/user/userprofile', { params: { lid } })
      .then(response => {
        if (response.data.data) {
          const data = response.data.data;
          setUsername(data.login.username);
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
          setImage(data.image);
        }
      })
      .catch(error => console.error("Error fetching user profile:", error));
  }, []);

  return (
    <div className="profile-container">
      <div className="profilhd">
        <h2>PROFILE</h2>
      </div>
      <button className="close-modal-btn" style={{ color: "black" }} onClick={() => nav('/')}>&times;</button>

      <div className="profilecard">
        <button className='iii' onClick={() => setIsEditModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
        </button>
        <Edit isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        
        <br/>
        <div>
          <button className='iii' onClick={() => setIsChangePassModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-160v-112q0-34 17.5-62.5T184-378q62-31 126-46.5T440-440q20 0 40 1.5t40 4.5q-4 58 21 109.5t73 84.5v80H120ZM760-40l-60-60v-186q-44-13-72-49.5T600-420q0-58 41-99t99-41q58 0 99 41t41 99q0 45-25.5 80T790-290l50 50-60 60 60 60-80 80ZM440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm300 80q17 0 28.5-11.5T780-440q0-17-11.5-28.5T740-480q-17 0-28.5 11.5T700-440q0 17 11.5 28.5T740-400Z"/></svg>
          </button>
          <Changepass isOpen={isChangePassModalOpen} onClose={() => setIsChangePassModalOpen(false)} />
        </div>

        <div className="profileimgdiv">
          <Image src={imgurl + image} roundedCircle className="profile-image" />
        </div>

        <div className='profiledetailsdiv'>
          <div className='tcontens'>
            <h4 className='heed'>Username: {username}</h4>
            <p className='plp'>Name: {name}</p>
            <p className='plp'>Email: {email}</p>
            <p className='plp'>Phone: {phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
