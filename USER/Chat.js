import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');
    const lid = sessionStorage.getItem('lid');
    const { id } = useParams();
    const nav = useNavigate();
    const location = useLocation();
    const trainername = location.state?.name || 'Chat';

    const handleSubmit = async (e) => {
        if (!input) return; 
        const h=await axios.post(`http://localhost:8000/user/sendmsg_post`, {
            sender: sessionStorage.getItem('lid'),
            receiver: id,
            message: input

        });
        console.log(h.data.status);
        
        if(h.data.status==="sucessmsg"){
            setInput('');

        }
        setMessage((prevMessages) => [
            ...prevMessages,
            { sender: lid, message: input }
        ]);
    }

    // useEffect(() => {
        // try{
        //     axios.get(`http://localhost:8000/chat/${id}`)
        //     .then((res) => {
        //         setMessage(res.data)
        //     })
        // }catch(err){
        //     console.log(err);
        // }
        
    // }, [id]);

    useEffect(() => {
        const viewmsg = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/user/viewmsg?id1=${lid}&id2=${id}`);
                if (res.data && res.data.data) {
                    setMessage(res.data.data);
                    console.log(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);

            }
        };

        viewmsg();
        const interval = setInterval(() => {
            viewmsg();

        }, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [lid, id]);



    return (
        <div className='chat'>
             <button className="close-modal-btn" onClick={() => nav(-1)}>
        &times;
      </button>

            <div className='chatcontainer'>

                <div className='chatbox'>

                    <h4 className='chatname'>{trainername}</h4>

                </div>
                <div className='line'></div>
                <div className='messagebox'>
                   
                    <div className='message'>
                        {message.map((item, index) => {
                            return (
                                <div key={index} className={item.sender === lid ? 'sending' : 'reciving'}>
                                    <p>{item.message}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='sendbox'>
                    <div className='input-container'>
                        <input type="text" placeholder='   Type here...' value={input} className='bbv' onChange={(e) => setInput(e.target.value)} />
                        <button className='vvb' onClick={handleSubmit}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg></button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Chat