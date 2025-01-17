import React, { useEffect, useState } from 'react';
import './Manageslots.css';
import { Col, Image } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';

const Manageslots = () => {
  // const nav = useNavigate();
  const [slots, setSlots] = useState([]);
  const [searchquerry, setSearchquery] = useState('');
  const imgurl = 'http://localhost:8000/';


  useEffect(() => {
    axios.get('http://localhost:8000/getslots')
      .then((response) => {
     setSlots(response.data.data);
       
      })

  }, []);
  const handleAction = async (id, newStatus) => {
  
  
    try {
      await axios.post('http://localhost:8000/acceptbooking_post', {
        id,
        adminstatus: newStatus,
      });
  
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot._id === id ? { ...slot, adminstatus: newStatus } : slot
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  
  const filteredSlots = slots.filter((slot) =>
    slot.name.toLowerCase().includes(searchquerry.toLowerCase())
  );

  return (
    <div className="manage-users">
      
      <header className="admin-header">
     
      </header>

      <Search searchquerry={searchquerry} setSearchquery={setSearchquery} />

      <div className="table-container">
  <table className="user-table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Date</th>
        <th>Time</th>
        <th>Duration</th>
        <th>Pool</th>
        <th>Trainer</th>
        <th>Admin Status</th>
        <th>Trainer Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredSlots && filteredSlots.length > 0 ? (
        filteredSlots.map((item) => (
          <tr key={item._id} className="trai">
            <td>
              <Col xs={6} md={4}>
                <Image
                  src={imgurl + item.image || ''}
                  rounded
                  className="qqb"
                />
              </Col>
            </td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.duration}</td>
            <td>{item.pools}</td>
            <td>{item.trainername}</td>
            <td>{item.adminstatus}</td>
            <td>{item.trainerstatus}</td>
            <td>
              {item.adminstatus === 'pending' && (
                <>
                  <button
                    className="qw"
                    onClick={() => handleAction(item._id, 'Accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="wq"
                    onClick={() => handleAction(item._id, 'Rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="11">No slots found</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    
    </div>
  );
};

export default Manageslots;
