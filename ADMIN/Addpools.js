import React, { useState } from 'react';
import './Addpools.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addpools = ({ isOpen, onClose }) => {
  const nav = useNavigate();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description,setDescription]=useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('');

  const data = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('length', length);
    formData.append('width', width);
    formData.append('depth', depth);
    formData.append('contact', contact);
    formData.append('status', status);

    try {
      const response = await axios.post('http://localhost:8000/addpool_post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'sucessaddpool') {
        alert('Pool added successfully');
        nav('/pools');
        window.location.reload();
        onClose();
      }
    } catch (error) {
      console.error('Error adding pool:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <form className="edit-form" onSubmit={data}>
          <button type="button" className="close-button" onClick={onClose}>
            &times;
          </button>
          <h3>Add Pools</h3>
          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])}  required/>
            <label>Name</label>
            <input type="text" placeholder="Pool Name" onChange={(e) => setName(e.target.value)} required />
            <label>Location</label>
            <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required />
            <label>Type</label>
            <input type="text" placeholder="Pool Type" onChange={(e) => setType(e.target.value)} required />
            <label>Description</label>
            <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
            <label>Length Of Pool</label>
            <input type="text" placeholder="Length" onChange={(e) => setLength(e.target.value)} required />
            <label>Width Of Pool</label>
            <input type="text" placeholder="Width" onChange={(e) => setWidth(e.target.value)} required />
            <label>Depth Of Pool</label>
            <input type="text" placeholder="Depth" onChange={(e) => setDepth(e.target.value)} required />
            <label>Contact and Support</label>
            <input type="text" placeholder="Contact"  onChange={(e) => setContact(e.target.value)} required />
            <label>Status</label>
            <input type="text" placeholder="Status" onChange={(e) => setStatus(e.target.value)} required />
          </div>
          <button type="submit" className="update-button">
            Add Pool
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpools;
