import React, { useState, useEffect } from 'react';
import './usernav.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';


const Usernav = () => {
  const [islogsuccess, setIslogsuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [complaint, setComplaint] = useState("");
  const lid = sessionStorage.getItem('lid');
  const nav = useNavigate();

  useEffect(() => {
   
    if (lid) {
      setIslogsuccess(true);
    }
  }, []);

  const login = () => {
    nav('/login');
  };

  const signup = () => {
    nav('/signup');
  };

  const profile = () => {
    if (islogsuccess) {
      nav('/userprofile');
    }
  };
const pools=()=>{
  if(!islogsuccess){
    alert('Please login first');
    nav('/login');
  }
  else if(islogsuccess){
    nav('/allpools');
  }
  
}
  const logout = () => {
    sessionStorage.removeItem('lid');
    setIslogsuccess(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fea = () => {
    nav('/features');
  };

  const trainer = () => {
 if(!islogsuccess){
    alert('Please login first');
    nav('/login');
  }
  else if(islogsuccess){
    nav('/viewtrainers');
  }
  };

  const viewsession = () => {
  
  nav('/viewsession');
  };

  const v = () => {
    nav('/feedback');
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendComplaint = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/complaint_post', { complaint, lid, });
      if (response.data.status === "successcomplaint") {
        alert("Complaint sent successfully");
        handleClose();
        setComplaint("");
      } else {
        alert("Failed to send complaint. Please try again.");
      }
    } catch (error) {
      console.error("There was an error sending the complaint:", error);
      alert("Error in sending complaint. Please try again later.");
    }
  };

  return (
    <div className='ushome'>
      <button className='uhead'>BlueWave</button>


      {!islogsuccess && (
        <div className='navrightbtn'>
          <button className='ubtn' onClick={login}>
            Login
          </button>
          <button className='ubtn' onClick={signup}>
            Signup
          </button>
        </div>
      )}

{islogsuccess &&(
      <div className='center-buttons'>
      <button className='tn' onClick={pools}>
         Pools
        </button>
        <button className='tn' onClick={trainer}>
          Trainers
        </button>
        <button className='tn' onClick={fea}>
          Services
        </button>
       
      </div>
      )}

      {islogsuccess && (
        <div className='right-buttons'>
          <button className='ubtn' onClick={profile}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button className='ubtn' onClick={logout}>
            Logout
          </button>
          <button className='ubtn' onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}

      {islogsuccess && isSidebarOpen && (
        <div className='sidebar'>
          <button className='cl' onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> 
          </button>
          <ul>
            <li onClick={() => nav('/viewbooking')} className='li'>  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg> Your Bookings</li>
            <li onClick={() => nav('/bookedschedules')} className='li'> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q8 0 15 1.5t14 4.5l-74 74H200v560h560v-266l80-80v346q0 33-23.5 56.5T760-120H200Zm261-160L235-506l56-56 170 170 367-367 57 55-424 424Z"/></svg> Booked Schedules</li>
            <li onClick={viewsession} className='li'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> View sessions</li>
            <li onClick={() => nav('/paymenthistory')} className='li'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg> Payment History</li>
            <li onClick={() => nav('/feedback')} className='li'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="m363-390 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg> Send Your Feedback</li>
            <li onClick={handleShow} style={{ cursor: 'pointer' }} className='li'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z"/></svg> Report complaint </li>
            <li onClick={() => nav('/viewreply')} className='li'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z"/></svg> View Replay From Admin</li>
            <li onClick={() => nav('/help')} className='li'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> Help</li>
            <li onClick={logout} className='li'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg> Logout</li>

          </ul>
        </div>
      )}

<div>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Complaints</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={sendComplaint}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Send your complaint</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    rows={3}
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="primary" type="submit" className='cbtn'>
                    Send
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
    </div>
    </div>
  );
};

export default Usernav;
