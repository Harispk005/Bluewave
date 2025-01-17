import React, { useEffect, useState } from 'react';
import './Dashbord.css';
import axios from 'axios';
import adminIcon from './admin.png';
import userIcon from './user.png';
import trainerIcon from './tr.png';
import complaintIcon from './send.png';
import feedbackIcon from './ffe.png';
import competitionIcon from './combet.png';
import { useNavigate } from 'react-router-dom';
import PieChart from '../ADMIN/Piechart';
import { use } from 'react';

const Dashboard = () => {
    const nav=useNavigate();
    const [usercount, setUsercount] = useState(0);
    const [trainercount, setTrainercount] = useState(0);
    const[compcount,setCompcount]=useState(0);
    const[feedcount,setFeedcount]=useState(0);
    const[poolcount,setPoolcount]=useState(0);
    const[bookingCount,setBookingCount]=useState(0);
   

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getusercount`);
                setUsercount(response.data.data);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };
        fetchCount();
    }, []);

    useEffect(() => {
        const fetchTrainerCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/gettrainercount`);
                setTrainercount(response.data.data);
            } catch (error) {
                console.error("Error fetching trainer count:", error);
            }
        };
        fetchTrainerCount();
    }, []);

    useEffect(() => {
        const fetchCompCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getcompcount`);
                setCompcount(response.data.data);
            } catch (error) {
                console.error("Error fetching trainer count:", error);    
            }
        };
        fetchCompCount();
    }, []);

    useEffect(() => {
        const fetchFeedCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getfeedcount`);
                setFeedcount(response.data.data);
            } catch (error) {
                console.error("Error fetching trainer count:", error);    
            }
        };
        fetchFeedCount();
    }, []);

    useEffect(() => {
        const fetchPoolCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getpoolcount`);
                setPoolcount(response.data.data);
                
            } catch (error) {
                console.error("Error fetching trainer count:", error);    
            }
        };
        fetchPoolCount();
    }, []);

    useEffect(() => {
        const fetchBookingCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getbookingscount`);
                setBookingCount(response.data.data);
                
            } catch (error) {
                console.error("Error fetching booking count:", error);    
            }
        };
        fetchBookingCount();
    }, []);

    const viewusers = () => {
      nav('/viewusers');
    };

    const complaints = () => {
      nav('/viewcomplaints');
    };
    const feedbacks = () => {
      nav('/viewreviews');
    };
    const chart = () => {
      nav('/piechart');
    };

    const viewtrainer = () => {
      nav('/viewtrainer');
    };

    

    return (
        <div className='dashboard'>
            <div className='msd'>
                <div className='ms'>
                   <div className='ms1'>
                    <h4 className='ms1hd'>
                        WELCOME ADMIN
                    </h4>
                    <p className='ms1p'>
                        You can view and Manage Your pools,Trainers,Users,Complaints, Competitions and Feedbacks
                    </p>
                   </div>
                   <div className='lgoo'>
                    <img src={adminIcon} alt="User" className='admin' />
                   </div>
                </div>
                <div className='ms2-ms3-container'>
                    <div className='ms2'>
                        <div className='user-container' onClick={viewusers}>
                            <h1 className='ffa'>Users</h1>
                            <img src={userIcon} alt="User" className='user' />
                        </div>
                        <h4 className='usercount'>Number of users: {usercount}</h4>
                        <button className='viewusers' onClick={viewusers}>View Users<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
                    </div>

                    <div className='ms3'>
                        <div className='user-container'onClick={viewtrainer}>
                            <h1 className='ffa'>Trainers</h1>
                            <img src={trainerIcon} alt="Trainer" className='user' />
                        </div>
                        <h4 className='usercount'>Number of Trainers: {trainercount}</h4>
                        <button className='viewusers' onClick={viewtrainer}>View Trainers<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
                    </div>
                </div>
            </div>


            <div className='rsd'>
                <div className='rs1-rs2-container'>
                    <div className='rs1'>
                        <div className='rs1-1' onClick={complaints}>
                            <h3 className='ffa'>Complaints</h3>
                            <img src={complaintIcon} alt="Complaint" className='kks' />
                        </div>
                        <h5 className='usercount'>Number of Complaints:{compcount}</h5>
                        <button className='viewcomplaints' onClick={complaints}>View Complaints<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
                    </div>
                    <div className='rs2'>
                         <div className='rs1-1' onClick={feedbacks}>
                            <h3 className='ffa'>Feedback</h3>
                            <img src={feedbackIcon} alt="Complaint" className='ssk' />
                        </div>
                        <h5 className='usercount'>Number of Feedbacks:{feedcount}</h5>
                        <button className='viewcomplaints' onClick={feedbacks}>View Feedback<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
                    </div>
                </div>
                <div className='rsqq' onClick={chart}>
                <h5 className='mngc'>Overall Statistics:</h5>
                    <PieChart
                    usercount={usercount}
                    trainercount={trainercount}
                    compcount={compcount}
                    feedcount={feedcount}
                    poolcount={poolcount}
                    bookingcount={bookingCount}
                    />
                   
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
