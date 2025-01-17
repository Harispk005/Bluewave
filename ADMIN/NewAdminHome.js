import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewAdminHome.css';
import Dashbord from './Dashbord';
import Managetrainer from './Managetrainer';
import Manageslots from './Manageslots';
import Managecomp from './Managecomp';
import Managepools from './Managepools';
import Changepassword from './Changepassword';
import Paymentdetails from './Paymentdetails';

const NewAdminHome = () => {
    const nav = useNavigate();
    const [open, setOpen] = useState('Dashboard');

    const logout = () => {
        sessionStorage.clear();
        nav('/login');
    };

    return (
        <div className="NewAdminHome">
            <div className="lsd">
                <h1 className="lsdhd">BlueWave</h1>
                <div className="lstt">
                    <button className="lsdbtn" onClick={() => setOpen('Dashboard')}> Dashboard</button>
                    <button className="lsdbtn" onClick={() => setOpen('managetrainer')}>Manage Trainer</button>
                    <button className="lsdbtn" onClick={() => setOpen('managepools')}>Manage Pools</button>
                    <button className="lsdbtn" onClick={() => setOpen('manageslots')}>Manage Slots</button>
                    <button className="lsdbtn" onClick={() => setOpen('managecomp')}>Manage Competitions</button>
                    <button className="lsdbtn" onClick={() => setOpen('paymentdetails')}>Payment Details</button>
                    <button className="lsdbtn" onClick={() => setOpen('changepassword')}>Change Password</button>
                    <button className="lsdbtn" onClick={logout}>LogOut</button>
                </div>
            </div>

            <div className="rside">
                {open === 'Dashboard' && <Dashbord />}
                {open === 'managetrainer' && <Managetrainer />}
                {open === 'managepools' && <Managepools />}
                {open === 'manageslots' && (
                    <>
                        <h1>Manage Slots</h1>
                        <Manageslots />
                    </>
                )}
                {open === 'managecomp' && <Managecomp />}
                {open === 'changepassword' && <Changepassword />}
                {open === 'paymentdetails' && (
                    <>
                        <h1>Payment Details</h1>
                        <Paymentdetails />
                    </>
                )}
            </div>
        </div>
    );
};

export default NewAdminHome;
