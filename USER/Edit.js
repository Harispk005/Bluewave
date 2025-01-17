import React, { useState } from 'react';
import './Edit.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = ({ isOpen, onClose }) => {
  const lid = sessionStorage.getItem('lid');
  const nav = useNavigate();

  const [editprofile, setEditprofile] = useState({
    Image: null,
    Username: '',
    Name: '',
    Email: '',
    Phone: '',
    Password: '',  
  });

  if (!isOpen) return null;

  const edit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (editprofile.Image && editprofile.Image[0]) {
      formData.append('image', editprofile.Image[0]);
    }

    
   if(editprofile.Username && editprofile.Username.trim() !== ""){
    formData.append('username', editprofile.Username);
   }
   if(editprofile.Name && editprofile.Name.trim() !== ""){
    formData.append('name', editprofile.Name);
   }
    if(editprofile.Email && editprofile.Email.trim() !== ""){
    formData.append('email', editprofile.Email);
   }
    if(editprofile.Phone && editprofile.Phone.trim() !== ""){
    formData.append('phone', editprofile.Phone);
   }

    if (editprofile.Password && editprofile.Password.trim() !== "") {
      formData.append('password', editprofile.Password);
    }

    formData.append('id', lid);

    try {
      const response = await axios.post('http://localhost:8000/user/editprofile_post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'sucesseditprofile') {
        alert('Profile edited successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <form className="edit-form" onSubmit={edit}>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => setEditprofile({ ...editprofile, Image: e.target.files })}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={editprofile.Username}
              onChange={(e) => setEditprofile({ ...editprofile, Username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={editprofile.Name}
              onChange={(e) => setEditprofile({ ...editprofile, Name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={editprofile.Email}
              onChange={(e) => setEditprofile({ ...editprofile, Email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              value={editprofile.Phone}
              onChange={(e) => setEditprofile({ ...editprofile, Phone: e.target.value })}
            />
          </div>
          {/* <div className="form-group">
            <label>Change Password</label>
            <input
              type="Password"
              placeholder=" Enter Old Password"
              value={editprofile.Password || ''}
              onChange={(e) => setEditprofile({ ...editprofile, Password: e.target.value })}
            />
          </div> */}
          <button className="update-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
