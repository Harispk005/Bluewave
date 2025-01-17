import React, { useEffect, useState } from 'react'
import './Changepassword.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Changepassword = () => {
  const nav=useNavigate();
 const[enterpass, setEnterpass] = useState(''); 
 const[oldpass, setOldpass] = useState('');
 const[newpass, setNewpass] = useState('');
 const[Confirmpass, setConfirmpass] = useState('');
 const[oldpassvalid, setOldpassvalid] = useState(false);

 const lid=sessionStorage.getItem('lid');

 useEffect(() => {
    axios.get('http://localhost:8000/user/userpass', { params: { lid } })
      .then(response => {
        setOldpass(response.data.data.password);  
      })
  },[lid]);
   
  const validateOldPassword = (e) => {
    e.preventDefault();
    if(enterpass===oldpass)
    {
        
         setOldpassvalid(true);
         setEnterpass('');
    }
    else 
    {
         alert("Old password is incorrect");
         setOldpassvalid(false);
    }
        
    }
    const ConfirmPassword=async(e)=>{
      e.preventDefault();
      if(newpass!==Confirmpass)
      {
        alert("New password and confirm password do not match");
      }
      else
      {
        updatepassword(e);
      }
      
     }
    
 const updatepassword=async(e)=>{
    e.preventDefault();
    const data={
        password:newpass,
        id:lid
    }
    await axios.post('http://localhost:8000/changepass_post', data);
    setOldpassvalid(false);
    setEnterpass('');
    setNewpass('');
    nav('/NewAdminHome');
    alert("Password changed successfully!");
    window.location.reload();
 }



    
    
  return (
    <div className='changepass'>
      
            {!oldpassvalid ?(
            <form className='changepassform' onSubmit={validateOldPassword}>
            <h3 className='changepasshd'>Enter Old Password</h3>
            <br/>
            <input type='password' placeholder='Enter old Password' className='changepassinput' value={enterpass} onChange={(e) => setEnterpass(e.target.value)}/>
            <br/>
          
            <button className='changepassbtn'>Next <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#CCCCCC"><path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z"/></svg></button>
        </form>
            ):(
                <form className='changepassform' onSubmit={ConfirmPassword}>
                <h3 className='changepasshd'>Enter New Password</h3>
                <br/>
                <input type='password' placeholder='Enter New Password' className='changepassinput' value={newpass} onChange={(e) => setNewpass(e.target.value)}/>
                <br/>
                <input type='password' placeholder='Confirm New Password' className='changepassinput' value={Confirmpass}  onChange={(e) => setConfirmpass(e.target.value)}/>
                <button className='changepassbtn'>Update</button>
            </form>
            )}


    </div>
  )
}

export default Changepassword