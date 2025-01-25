import React, { useEffect, useState } from 'react'
import './Manageschedule.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Image } from 'react-bootstrap';


const Manageschedule = () => {
    const nav=useNavigate();
    const[schedule,setSchedule]=useState([]);
    const[searchQuery,setSearchQuery]=useState('');
    const imgurl='http://localhost:8000/';
    const lid=sessionStorage.getItem('lid')
console.log(lid);


    useEffect(()=>{
        axios.get('http://localhost:8000/trainer/getschedule',{params:{lid}})
        .then((response)=>{
            setSchedule(response.data.data);
            console.log(response.data.data);
            

        })
    },[]);


    const accept=async(id,newStatus)=>{
        // console.log(id,newStatus);
        

        await axios.post('http://localhost:8000/trainer/acceptbooking_post',{id,trainerstatus:newStatus});
        setSchedule((prevSlots)=>
        prevSlots.map((slot)=>
        
        slot._id=== id ? {...slot,trainerstatus:newStatus}:slot
        
    )
        );
        
        
    }
    const filterSchedule=schedule.filter((item)=>{
        return(
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pools.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.trainername.toLowerCase().includes(searchQuery.toLowerCase())
        )
    });
    return (
        <div className='manageschedule'>

            <header className='scheduleheader'>
                <h1>Manage Schedule</h1>
            </header>

            <div className='searchbox'>
                <input 
                type='text'
                placeholder='🔍 Search...'
                style={{padding:"8px",fontSize:"16px",borderRadius:"4px",width:"100%",border:"1px solid #ccc",marginRight:"10px"}}
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                >
                </input>
            </div>

            <div>
                <table className='bookingtable'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Pool</th>
                            <th>Trainer</th>
                            <th>Admin Status</th>
                            <th>Trainer Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterSchedule.map((item) => (
                        <tr>
                            <td>
                            <Col xs={6} md={4}>
                        <Image
                          src={imgurl + item.image || ''}
                          rounded
                          className='qqb'
                          height="80px"
                          width={140}
                        />
                      </Col>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.duration}</td>
                            <td>{item.pools}</td>
                            <td>{item.trainername}</td>
                            <td>{item.adminstatus}</td>
                            <td>{item.trainerstatus}</td>
                            <td>
                                {item.trainerstatus==='pending'&&(
                                    <>
                                     <button className='accept' onClick={()=>accept(item._id,'Accepted')}>Accept</button>
                                     <button className='decline' onClick={()=>accept(item._id,'Declined')}>Decline</button>
                                    </>
                                )}
                               
                            </td>

                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Manageschedule