import React, { useState } from 'react';
import './Addcomp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addcomp = ({ isOpen, onClose }) => {
const nav=useNavigate();

const[compimage,setcompimage]=useState('');
const[compname,setcompname]=useState('');
const[organizer,setorganizer]=useState('');   
const[date,setdate]=useState('');
const[venue,setvenue]=useState('');
const[checkin,setcheckin]=useState('');
const[agegroup,setagegroup]=useState('');
const[regfee,setregfee]=useState('');
const[contactno,setcontactno]=useState('');
const[prize,setprize]=useState('');

const data=async(e)=>{
  e.preventDefault();
  const formData=new FormData();
  formData.append('compimage',compimage);
  formData.append('compname',compname);
  formData.append('organizer',organizer);
  formData.append('date',date);
  formData.append('venue',venue);
  formData.append('checkin',checkin);
  formData.append('agegroup',agegroup);
  formData.append('regfee',regfee);
  formData.append('contactno',contactno);
  formData.append('prize',prize);

  const savedata=await axios.post('http://localhost:8000/addcompetition_post',formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
    
  })

  if(savedata.data.status==='sucessaddcompetition'){
    alert('Competition Added Successfully');
    nav('/managecomp');
    window.location.reload();
    onClose();
  }





}
if (!isOpen) return null;

const handleClose = (event) => {
  event.preventDefault(); 
  onClose();
};

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <form className="edit-form" onSubmit={data}>
          <button type="button" className="close-button" onClick={handleClose}>
            &times;
          </button>
          <h3>Add Competition</h3>
          <div className="form-group">
            <label>Competition Image</label>
            <input type="file" placeholder="Image" onChange={(e) => setcompimage(e.target.files[0])}  required/>
            <label>Competition Name</label>
            <input type="text" placeholder="Competition Name" onChange={(e) => setcompname(e.target.value)} required />
            <label>Organizer</label>
            <input type="text" placeholder="Organizer" onChange={(e) => setorganizer(e.target.value)} required />
            <label className='frm-date'>Date</label>
            <input type="date" placeholder="Date"   onChange={(e) => setdate(e.target.value)} required/>
            <label>Venue</label>
            <input type="text" placeholder="Venue" onChange={(e) => setvenue(e.target.value)}  required/>
            <label className='frm-date'>Checkin Time</label>
            <input type="time" placeholder="Checkin Time" onChange={(e) => setcheckin(e.target.value)}  required/>
            <label>Age Group</label>
            <input type="text" placeholder="Age Group"  onChange={(e) => setagegroup(e.target.value)} required/>
            <label>Registration Fee</label>
            <input type="text" placeholder="Registration Fee" onChange={(e) => setregfee(e.target.value)} required />
            <label>Prize</label>
            <input type="text" placeholder="Prize"  onChange={(e) => setprize(e.target.value)} required/>
            <label>Contact No</label>
            <input type="text" placeholder="Contact" onChange={(e) => setcontactno(e.target.value)} required />
          </div>
          <button type="submit" className="update-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcomp;
