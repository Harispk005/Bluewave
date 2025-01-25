import React, { useEffect, useState } from 'react'
import './Chattrainer.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Chattrainer = () => {
    const [messages, setMessages] = useState([]);  // State for messages
    const [input, setInput] = useState('');         // State for message input
    const trainerid = sessionStorage.getItem('lid'); // Assume trainer id is stored in sessionStorage
    const nav = useNavigate();
    const { id } = useParams(); // Get the user id from URL parameters
    const [user, setUser] = useState({}); // State to store user info

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/trainer/view_user?id=${id}`);
                setUser(res.data.data); // Set user data
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [id]); // Fetch when id changes

    // Handle message submission
    const handleSubmit = async (e) => {
        if (!input) return; // Don't send empty messages
        try {
            await axios.post(`http://localhost:8000/user/sendmsg_post`, {
                sender: trainerid,
                receiver: id,
                message: input
            });
            // Update messages state after sending
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: trainerid, message: input }
            ]);
            setInput(''); 
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };

    // Fetch chat messages
    useEffect(() => {
        const viewmsg = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/user/viewmsg?id1=${trainerid}&id2=${id}`);
                setMessages(res.data.data); // Set the fetched messages
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };
        viewmsg();

        const interval = setInterval(viewmsg, 5000); // Fetch new messages every 5 seconds

        return () => {
            clearInterval(interval); // Clean up the interval on unmount
        };
    }, [trainerid, id]); // Fetch messages when trainerid or id changes

    return (
        <div className='chattrainer'>
                <button className="close-modal-btn" onClick={() => nav(-1)}>
        &times;
      </button>
            <div className='chatcontainerrrr'>
                <div className='chatbox'>
                    <h4 className='chatname'>{user.name}</h4> {/* Display user's name */}
                </div>
                <div className='line'></div>
                <div className='messagebox'>
                    {messages.map((item, index) => (
                        <div key={index} className={item.sender === trainerid ? 'sending' : 'receiving'}>
                            <p>{item.message}</p>
                        </div>
                    ))}
                </div>
                <div className='chatinput'>
                    <div className='input-container'>
                        <input
                            type="text"
                            placeholder='   Type here...'
                            className='llk'
                            value={input}
                            onChange={(e) => setInput(e.target.value)} // Update input state on change
                        />
                        <button className='vvb' onClick={handleSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chattrainer;
