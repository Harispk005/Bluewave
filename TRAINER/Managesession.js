import React, { useEffect, useState } from 'react';
import './Managesession.css';
import { Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Editsession from './Editsession';

const Managesession = () => {
    const nav = useNavigate();
    const lid = sessionStorage.getItem('lid');
    const imgurl = 'http://localhost:8000/';
    const [sessions, setSessions] = useState([]);
    const[searchquerry, setSearchquery] = useState('');
    const [iseditmodalopen, setIsEditModalOpen] = useState(false);
    const [editid, setEditId] = useState(null);

    const openEditModal = (id) => {
        setEditId(id);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditId(null);
        setIsEditModalOpen(false);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8000/trainer/viewsession', { params: { lid } })
            .then((response) => {
                setSessions(response.data.data);
            });
    }, [lid]);

    const addsession = () => {
        nav('/addsession');
    };

    const deletesession=(id)=>{
        axios.get('http://localhost:8000/trainer/deletesession', { params: { id } })
    .then((response) => {
        if(response.data.status==="sucessdeletesession"){
            alert('Session deleted successfully');
            window.location.reload();   
        }
    })
    }

    const filteredSessions= sessions.filter((item)=>{
        return(
            item.date.toLowerCase().includes(searchquerry.toLowerCase())
        )
    });

    return (
        <div className='managesession'>
            <header className='managesessionhd'>
                <h1>Manage Session</h1>
            </header>
            <div className='searchbox'>
                <input 
                type='text'
                placeholder='🔍 Search...'
                style={{padding:"8px",fontSize:"16px",borderRadius:"4px",width:"300px",border:"1px solid #ccc",marginRight:"10px"}}
                value={searchquerry}
                onChange={(e)=>setSearchquery(e.target.value)}
                >
                </input>
            </div>
            <div className='addsession'>
                <button className='addsessionbtn' onClick={addsession}>
                    Add Session
                </button>
            </div>
            <div>
                <table className='sessiontbl'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Trainer Name</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSessions.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <Col xs={6} md={4}>
                                        <Image
                                            src={imgurl + item.image}
                                            rounded
                                            className='qqb'
                                            height="80px"
                                            width={140}
                                        />
                                    </Col>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.date}</td>
                                <td>{item.fromtime}</td>
                                <td>{item.totime}</td>
                                <td>
                                    <button
                                        className='editsessionbtn'
                                        onClick={() => openEditModal(item._id)}
                                    >
                                        Edit
                                    </button>
                                    <button className='deletessessionbtn' onClick={()=>deletesession(item._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {iseditmodalopen && (
                <Editsession
                    isOpen={iseditmodalopen}
                    onClose={closeEditModal}
                    editid={editid}
                />
            )}
        </div>
    );
};

export default Managesession;
