import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login_post', { Username: username, password });
      if (res.data.status === "sucessadmin") {
        sessionStorage.setItem('lid', res.data.lid);
        console.log(sessionStorage.getItem('lid'));
        nav('/NewAdminHome');

      } else if (res.data.status === "successuser") {
        sessionStorage.setItem('lid', res.data.lid);
        console.log(sessionStorage.getItem('lid'));
        nav('/');

      } else if(res.data.status==="successtrainer"){
        sessionStorage.setItem('lid', res.data.lid);
        console.log(sessionStorage.getItem('lid'));
        
      
        nav('/trainerhome')
      } 
      
      else {
        alert('Invalid credentials');
        window.location.reload();
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const signup = () => {
    nav('/signup');
  };

  return (
    <body className='logbody'>
    
    <div className='smain'>

       <div className='s1'>
           
      <div className='gdgd'>
      <p className='sp1'>WELCOME TO <h1>BLUE WAVE</h1>  </p>
      </div>
          <p className='para'>
           Your One-Stop Destination for Aquatic Adventures,dive into the world of aquatic activities and unlock your inner swimmer!
           Please login to access your personalized swimming experience. 
           </p>
       </div>
       
       <div className='s2'>
      <form className='frm' onSubmit={handleSubmit}>
       <h2 className='fhd'>LOGIN</h2>
       <br/>
      <label className='l1'>Username</label>
      <input 
      type="text"
       placeholder="" 
       className='l2'
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       required/>
      <label className='l1'>Password</label>
      <input 
      type="password" 
      placeholder="" 
      className='l2'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required />
      <br/>
      <button type="submit" className='b1'>Login</button>
       <br/>
      <span className='sp'>Don't have an account? <button className='b2' onClick={signup}>Sign Up</button></span>
      </form>
       </div>
       

    </div>





   </body>
  );
};

export default Login;
