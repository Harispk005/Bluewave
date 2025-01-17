import React, { useEffect, useState } from 'react'
import './Userregistration.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Userregistration = () => {
    const nav = useNavigate()
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[phone,setPhone]=useState('')
    const [image, setImage] = useState('');
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[existemail,setExistemail]=useState('')


  
       
          
    const data = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('image', image);
        formData.append('username', username);
        formData.append('password', password);
    
        try {
            const response = await axios.post('http://localhost:8000/user/signup_post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.status === 'signupsuccess') {
                alert('Registration successful');
                nav('/login');
            } else if (response.data.status === 'signupfailure') {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };
    
  
  

    return (
        <>
            <h1 className='heading'>User Registration</h1>
            <form className='form' onSubmit={data}>
                <label for="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}

                    required />

                <label for="email">Email:</label>
                <input type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}

                    required />

                <label for="phone">Phone:</label>
                <input type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}

                    required />

                <label for="image">Image:</label>
                <input type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />

                <label for="username">Username:</label>
                <input type="text"
                    id="username"
                    name="username"

                    onChange={(e) => setUsername(e.target.value)}

                    required />

                <label for="password">Password:</label>
                <input type="password"
                    id="password"
                    name="password"

                    onChange={(e) => setPassword(e.target.value)}

                    required />

                <input type="submit" value="Register" />
            </form>
        </>
    )
}

export default Userregistration