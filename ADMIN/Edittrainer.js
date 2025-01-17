import React, { useState } from 'react'
import './Edittrainer.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edittrainer = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const[edittrainer,setEdittrainer]=useState({
        image: null,
        Name: "",
        Email: "",
        Phone: "",
        Age: "",
        Qualification: "",
        Skills: "",
        Experience: "",
        
    });
    const edit = async (e) => {
    
        const formData=new FormData();
        formData.append('image',edittrainer.image[0]);
        formData.append('name',edittrainer.Name);
        formData.append('email',edittrainer.Email);
        formData.append('phone',edittrainer.Phone);
        formData.append('age',edittrainer.Age);
        formData.append('qualification',edittrainer.Qualification);
        formData.append('skills',edittrainer.Skills);
        formData.append('experience',edittrainer.Experience);
        formData.append('id',id);

        const data=await axios.post('http://localhost:8000/edittrainer_post',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(data.data.status==='sucessedittrainer'){
            alert('Trainer edited successfully');
            nav('/managetrainer');
        }
    }
  

  return (
    <div className="edittrainer">
    <span className="edittrainerhead">Edit Trainer</span>
    <form onSubmit={edit} >
        <label htmlFor="image">Image:</label>
        <input
            type="file"
            id="image"
            name="image"
           onChange={(e) => setEdittrainer({ ...edittrainer, image: e.target.files })}
            accept="image/*"
          
        />
        <label htmlFor="Name">Name:</label>
        <input
            type="text"
            id="Name"
            name="Name"
            onChange={(e)=>setEdittrainer({...edittrainer,Name:e.target.value})}
           
        
        />

<label htmlFor="Email">Email:</label>
        <input
            type="text"
            id="Email"
            name="Email"
            onChange={(e)=>setEdittrainer({...edittrainer,Email:e.target.value})}
           
        
        />

        
<label htmlFor="Phone">Phone:</label>
        <input
            type="text"
            id="Phone"
            name="Phone"
           onChange={(e)=>setEdittrainer({...edittrainer,Phone:e.target.value})}
        
        />
      
        <label htmlFor="Age">Age:</label>
        <input
            type="text"
            id="Age"
            name="Age"
            onChange={(e)=>setEdittrainer({...edittrainer,Age:e.target.value})}
            
           
        />
        

        <label htmlFor="Qualification">Qualification:</label>
        <input
            type="text"
            id="Qualification"
            name="Qualification"
            onChange={(e)=>setEdittrainer({...edittrainer,Qualification:e.target.value})}
            
        />
        <label htmlFor="Skills">Skills:</label>
        <input
            type="text"
            id="Skills"
            name="Skills"
            onChange={(e)=>setEdittrainer({...edittrainer,Skills:e.target.value})}
            
        />
        <label htmlFor="Experience">Experience:</label>
        <input
            type="text"
            id="Experience"
            name="Experience"
            onChange={(e)=>setEdittrainer({...edittrainer,Experience:e.target.value})}
            
        />
        <button type="submit" className="aadd">Save Changes</button>
    </form>
</div>
  )
}

export default Edittrainer