import React, { useEffect, useState } from 'react';
import './Managepools.css';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import Addpools from './Addpools';
import Editpool from './Editpool';

const Managepools = () => {
  const nav = useNavigate();
  const [viewpool, setViewpool] = useState([]);
  const [searchquerry, setSearchquery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (id) => {
    setEditId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditId(null);
    setIsEditModalOpen(false);
  };

  const poolDetails = () => {
    nav('/pools')
  }

  const imgurl = 'http://localhost:8000/';

  useEffect(() => {
    axios
      .get('http://localhost:8000/getpools')
      .then((response) => {
        setViewpool(response.data.data);
      })
      .catch((error) => console.error('Error fetching pools:', error));
  }, []);

  const deletePools = (id) => {
    axios
      .get('http://localhost:8000/deletepool', { params: { id } })
      .then((response) => {
        if (response.data.status === 'sucessdeletepool') {
          alert('Pool deleted successfully');
      
        }
      })
      .catch((error) => console.error('Error deleting pool:', error));
  };

  const filteredPools = viewpool.filter((pool) =>
    pool.name.toLowerCase().includes(searchquerry.toLowerCase())
  );

  return (
    <div className="pools-management">
      <header className="admin-header">
        <h1>Pool Management</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Search searchquerry={searchquerry} setSearchquery={setSearchquery} />
          <button className="add-user-btn" onClick={openModal}>
            Add Pool
          </button>
          <button className='add-user-btn'onClick={poolDetails}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg></button>
        </div>
      </header>

      <div className="table-container">
        <table className="pools-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Type</th>
              {/* <th>Description</th> */}
              <th>Length</th>
              <th>Width</th>
              <th>Depth</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPools && filteredPools.length > 0 ? (
              filteredPools.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Image
                      src={`${imgurl}${item.Image}`}
                      alt={item.name}
                      rounded
                      style={{ width: '80px', height: '50px' }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.type}</td>
                  {/* <td>{item.description}</td> */}
                  <td>{item.length}</td>
                  <td>{item.width}</td>
                  <td>{item.depth}</td>
                  <td>{item.contact}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deletePools(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No pools found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Addpools isOpen={isModalOpen} onClose={closeModal} />
      <Editpool isOpen={isEditModalOpen} onClose={closeEditModal} poolID={editId} />
    </div>
  );
};

export default Managepools;
