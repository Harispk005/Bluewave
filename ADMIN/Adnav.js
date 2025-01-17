import React, { useState } from 'react';
import './Adnav.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt,faArrowLeft,faPeopleRoof,faWaterLadder,faCheckToSlot,faMedal} from '@fortawesome/free-solid-svg-icons';




const Adnav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const nav = useNavigate();

    const handleAdminClick = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar
    };

    const handlesubmit = () => {
        nav('/login');
    };
    const managetrainer = () => {
        nav('/managetrainer');
    };
    const goback=() => {
        window.location.reload();
    }
    const managepools = () => {
        nav('/pools')
    }
    const complaints = () => {
        nav('/viewcomplaints')
    }

    const viewusers = () => {
        nav('/viewusers')
    }

    const viewreviews = () => {
        nav('/viewreviews')
    }
    const manageslots = () => {
        nav('/manageslots')
    }
    const competitions = () => {
        nav('/managecomp')
    }
    const gg=() => {
        nav('/NewAdminHome')
    }


    return (
                <div className='adminhome'>
                    <div>
                        <button className='adminhead' onClick={handleAdminClick}>BLUEWAVE</button>
                    </div>
        
                    <div>
                        <button className='adminbtn' onClick={viewusers}>View Users</button>
                        <button className='adminbtn' onClick={viewreviews}>View Reviews</button>
                        <button className='adminbtn'onClick={complaints}>Complaints & Send Reply</button>
                        <button className='adminbtn' onClick={gg}>Payment Details</button>
                        <button className='adminbtn' onClick={handlesubmit}><FontAwesomeIcon icon={faSignOutAlt} /></button>
                    </div>
                    {isSidebarOpen && (
    <div className={`sidebar ${isSidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
        <div className="sidebar-content">
            <button className="sidebar-button" onClick={managetrainer}>
                <FontAwesomeIcon icon={faPeopleRoof} /> Manage Trainers
            </button>
            <button className="sidebar-button" onClick={managepools}>
                <FontAwesomeIcon icon={faWaterLadder} /> Manage Pools
            </button>
            <button className="sidebar-button" onClick={manageslots}>
                <FontAwesomeIcon icon={faCheckToSlot} /> Manage Slots
            </button>
            <button className="sidebar-button" onClick={competitions}>
                <FontAwesomeIcon icon={faMedal} /> Manage Competitions
            </button>
            <button className="sidebar-button" onClick={goback}>
                <FontAwesomeIcon icon={faArrowLeft} /> Go Back
            </button>
            <button className="sidebar-button" onClick={handlesubmit}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
        </div>
    </div>
)}

                
                </div>
            );
        };
        
        export default Adnav;
        

