import React, { useEffect, useState } from 'react';
import './Managecomp.css';
import Addcomp from './Addcomp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';
import Editcomp from './Editcomp';

const Managecomp = () => {
  const nav=useNavigate();
  const imgurl = 'http://localhost:8000/';
const[viewcomp,setViewcomp]=useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const[iseditmodalopen, setIsEditModalOpen] = useState(false);
  const[editid, setEditId] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal =(id)=>{
    setEditId(id);
    setIsEditModalOpen(true);
  }

  const closeEditModal = () =>{
    setEditId(null);
    setIsEditModalOpen(false);

  }

  const deletecomp=(id)=>{
    axios.get("http://localhost:8000/deletecomp", { params: { id: id } })
    .then((response) => {
      if (response.data.status === "sucessdeletecomp") {
        alert("Competition deleted successfully");
        window.location.reload();
      }
    })
  }

  useEffect(()=>{

    axios.get('http://localhost:8000/getcompetitions').then((response)=>{
      setViewcomp(response.data.data);
      console.log(response.data.data);
    })

  },[])

  return (
    <div className="manage-comp">
    
      <header className="manage-comp-header">
        <h3>Manage Competitions</h3>
      </header>

      <div>
     
  
        <table className="user-table">
          <thead>
            <tr>
              <th>Competition Image</th>
              <th>Competition Name</th>
              <th>Organizer</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Checkin Time</th>
              <th>Age Group</th>
              <th>Registration Fee</th>
              <th>Prize</th>
              <th>Contact no</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {viewcomp.map((item) => (
            <tr>
            
            <td>
            <Col xs={6} md={4}>
            <Image src={imgurl + item.image} rounded height="80px" width={140} /></Col>
             </td>
              <td>{item.name}</td>
              <td>{item.organizer}</td>
              <td>{item.date}</td>
              <td>{item.venue}</td>
              <td>{item.time}</td>
              <td>{item.agegroup}</td>
              <td>{item.regfee}</td>
              <td>{item.prize}</td>
              <td>{item.contactno}</td>
              <td>
                <button className="edit-btn" onClick={() => {openEditModal(item._id)
                  setEditId(item._id);
                }}>
                  Edit
                  </button>
                  <Editcomp isOpen={iseditmodalopen} onClose={closeEditModal} editid={editid} />
                <button className="delete-btn" onClick={() => deletecomp(item._id)}>Delete</button>
             
              </td>
           
            </tr>
                ))}
          </tbody>
        </table>
                
            
      </div>

      <button className="add-comp-btn" onClick={openModal}>
        Add Competitions
      </button>
      <Addcomp isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Managecomp;
