import axios from 'axios';
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'

const Changepass = ({ isOpen, onClose }) => {
    const[valpass, setValpass] = useState('');
    const[oldpass, setOldpass] = useState('');
    const[changepass, setChangepass] = useState('');
    const[isoldpassvalid, setIsoldpassvalid] = useState(false);
    const lid=sessionStorage.getItem('lid');
    useEffect(() => {
        axios.get('http://localhost:8000/user/userpass', { params: { lid } })
          .then(response => {
            setOldpass(response.data.data.password);
          })
    },[lid]);
    const validateOldPassword = (e) => {
        e.preventDefault();
      
        if(valpass===oldpass)
        {
            
         setIsoldpassvalid(true);
        }
        else 
        {
         alert("Old password is incorrect!");
         setIsoldpassvalid(false);
        }
        
    }
    const updatepassword=async(e)=>{
        e.preventDefault();
        const data={
            password:changepass,
            lid:lid
        }
        await axios.post('http://localhost:8000/user/changepass_post', data);
        setIsoldpassvalid(false);
        setValpass('');
        setChangepass('');
        onClose();
        alert("Password changed successfully!");
        window.location.reload();
    }

    if (!isOpen) return null;
  return (
    <div className="modal-overlay">
    <div className="edit-modal">
    {!isoldpassvalid ?(
      <form className="edit-form" onSubmit={validateOldPassword}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      
        <div className="form-group">
          <label>Enter Old Password:</label>
          <input
            type="Password"
            placeholder=" Enter Old Password" 
            value={valpass}
            onChange={(e) => setValpass(e.target.value)}
          />
        </div>

        <button className="update-button">
          Next
        </button>
      </form>
    ) : (
        
    

      <form className="edit-form" onSubmit={updatepassword}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      
        <div className="form-group">
          <label>Enter New Password:</label>
          <input
            type="Password"
            placeholder=" Enter New Password" 
            value={changepass}
            onChange={(e) => setChangepass(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="Password"
            placeholder=" Confirm New Password" 
            value={changepass}
            onChange={(e) => setChangepass(e.target.value)}
          />
        </div> */}

        <button className="update-button">
          Update
        </button>
      </form>

    )}
    </div>
  </div>
  )
}

export default Changepass