import React, { useState } from 'react';
import './Addtrainer.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addtrainer = () => {
    const navigate = useNavigate(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [qualification, setQualification] = useState('');
    const[skills,setSkills]=useState('');
    const[experience,setExperience]=useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    const data = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('image', image);
        formData.append('qualification', qualification);
        formData.append('skills', skills);
        formData.append('experience', experience);
        formData.append('username', username);
        formData.append('password', password);

        await axios.post('http://localhost:8000/trainer/addtrainer_post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if (response.data.status === 'signupsuccess') {
                alert('Trainer added successfully');
                navigate('/managetrainer');
            }
        });
        
    };

    return (
        <div>
            <h1 className='heading'>Trainer Registration</h1>
            <form onSubmit={data}> 
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />

                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />

                <label htmlFor="phone">Phone:</label>
                <input 
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                />

                <label htmlFor="gender">Gender:</label>
                <select
                    className='gender'
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">Select Gender</option> 
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="age">Age:</label>
                <input 
                    type="text"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required 
                />

                <label htmlFor="image">Image:</label>
                <input 
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])} 
                />
                 <label htmlFor="Qualification">Qualification:</label>
                <input 
                    type="text"
                    id="Qualification"
                    name="Qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required 
                />

                 <label htmlFor="skills">Skills:</label>
                <input 
                    type="text"
                    id="skills"
                    name="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required 
                />
                  <label htmlFor="experience">Experience:</label>
                <input 
                    type="text"
                    id="experience"
                    name="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required 
                />

                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Addtrainer;
