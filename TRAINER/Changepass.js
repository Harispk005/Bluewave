import React, { useState } from 'react'
import './Changepass.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Changepass = () => {
    const[newPassword, setNewPassword] =useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const nav=useNavigate();
    
    const lid = sessionStorage.getItem('lid');

    const handleSubmit =async (e) => {
        if(newPassword !== confirmPassword){
            alert("New password and confirm password do not match!");
            return;
        }
        try{
            await axios.post('http://localhost:8000/trainer/changepass_post', {
                id: lid,
                newPassword: newPassword,
            });
            console.log("Password change request sent!");
            alert("Password changed successfully!");
            nav('/trainerhome')
        }catch(err){
            console.log("Error changing password:", err);
        }
    }
  return (
    <div className='change'>
        <form className='changecard' onSubmit={handleSubmit}>
            <div className='in'>
                <h3>Change Password</h3>
                <br/>


                
                <br/>
                <label>New Password</label>
                <input type='password' placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)}/>
                <br/>
                
                <label>Confirm Password</label>
                <input type='password' placeholder='Confirm Password'onChange={(e) => setConfirmPassword(e.target.value)}/>
                <br/>
                <br/>
            
                
                <button className='passbtn'>Change Password</button>
            </div>
        </form>
    </div>
  )
}

export default Changepass