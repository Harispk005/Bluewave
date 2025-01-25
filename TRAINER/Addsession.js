import React, { useEffect, useState } from 'react';
import './Addsession.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Addsession = () => {
    const nav = useNavigate();
    const lid = sessionStorage.getItem('lid');
    const [name,setName]=useState('');
    const[phone,setPhone]=useState('');
    const[date,setDate]=useState('');
    const[fromtime,setFromtime]=useState('');
    const[totime,setTotime]=useState('');

    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get(`http://localhost:8000/trainer/trainerdetails`,{params:{lid:lid}});
            setName(response.data.trainerdata.name);
            setPhone(response.data.trainerdata.phone);

            console.log(` ${name} ${phone}`);
            

        }
        fetch();

    },[lid])

    const data=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',name);
        formData.append('phone',phone);
        formData.append('fromtime',fromtime);
        formData.append('totime',totime);
        formData.append('date',date);
        formData.append('lid',lid);

        await axios.post('http://localhost:8000/trainer/addsession_post', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        
        })
        .then((response) => {
            if (response.data.status === 'successaddsession') {
                alert('Session added successfully');
                nav(-1);
            }
        });
    }


  return (
    <div className="add-session-container">
      <form className="rew" onSubmit={data}>
        <div className="div">
          <label htmlFor="Name">Name:</label>
          <input type="text" id="Name" name="Name" className="in1" value={name} readOnly />

          <div className="grd">
            <div className='lfr'>

              <label htmlFor="phone">Date:</label>
              <input type="Date" id="Date" name="Date" className="in1" onChange={(e) => setDate(e.target.value)}  required/>

            </div>
            <div className="lfr">
              <label htmlFor="from-time">From:</label>
              <input type="time" id="from-time" name="from-time" className="in2" onChange={(e) => setFromtime(e.target.value)} required />
            </div>
            <div className="rto">
              <label htmlFor="to-time">To:</label>
              <input type="time" id="to-time" name="to-time" className="in2" onChange={(e) => setTotime(e.target.value)}  required/>
            </div>
          </div>

          <div className="div1">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" className="in1" value={phone} readOnly />
            </div>
            
            <div className='jjj'>
            <button type="submit" className="bk">Add Sessions</button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Addsession;
