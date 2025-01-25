import React, { useState } from 'react'
import './Trainerhome.css'
import Viewtrainerprofile from './Viewtrainerprofile';
import Viewtrainerbookings from './Viewtrainerbookings';
import Manageschedule from './Manageschedule';
import Overview from './Overview';
import { useNavigate } from 'react-router-dom';
import Userrequest from './Userrequest';
import Changepass from './Changepass';
import Managesession from './Managesession';
const Trainerhome = () => {
  const nav=useNavigate();
  const[open,setOpen]=useState('Overview');
  return (
    <div className='trainerhome'>
      <div className='left'>

        <div className='brandhd'>
          <h2>BlueWave</h2>
        </div>
      
    <button className='center' onClick={()=>setOpen('Overview')}>Overview</button>
    <button className='center'onClick={()=>setOpen('Profile')}>View Profile</button>
    <button className='center'onClick={()=>setOpen('Schedule')}>Manage Schedules</button>
    <button className='center'onClick={()=>setOpen('Booking')} >View Booking</button>
    <button className='center'onClick={()=>setOpen('Session')}>Manage Sessions</button>
    <button className='center' onClick={()=>setOpen('Request')}>Manage Requests</button>
    <button className='center' onClick={()=>setOpen('password')}>Change Password</button>
    <button className='center' onClick={()=>nav('/login')}>LogOut</button>



      </div>
     <div className='right'>
     {open==='Overview'&&(
        <>
      <Overview/>
   
        </>
      )}

      {open==='Profile'&&(
        <>
        <Viewtrainerprofile/>
        </>
      )}

      {open==='Booking'&&(
        <>
        <Viewtrainerbookings/>
        </>
      )}

      {open==='Schedule'&&(
        <>  
        <Manageschedule/>
        </>
      )}

      {open==='Session'&&(
        <>
       <Managesession/>
        </>
      )}

      {open==='Request'&&(
        <>  
        <Userrequest/>
        </>
      )}

      {open==='password'&&(
        <>
        <Changepass/>
        </>
      )}
     </div>
    </div>
  )
}

export default Trainerhome