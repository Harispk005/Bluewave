import React, { useEffect, useState } from 'react';
import './Bookslots.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Bookslots = () => {
    const nav = useNavigate();
    const { id } = useParams(); 

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const pool = id
    const [email, setEmail] = useState('');
    const [trainer, setTrainer] = useState('');
    const [duration, setDuration] = useState('');
    const[amount,setAmount]=useState('')
    const [trainerdata, setTrainerdata] = useState([]);

    const pricing={
        "30 min":100,
        "1 hr":200,
        "2 hr":350,
        "3 hr":500,
        "4 hr":700,
    }

    const book = async (e) => {
        e.preventDefault();
    
        if (!name || !phone || !date || !time || !email || !trainer || !duration) {
            alert("All fields are required");
            return;
        }
     
    
        const bookingdata = {
            name,
            phone,
            date,
            time,
            pool,
            email,
            trainer,
            duration,
            amount,
            lid: sessionStorage.getItem('lid'),
        };
    
        try {
            const response = await axios.post('http://localhost:8000/user/bookslots_post', bookingdata, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.data.status === 'sucessbookslots') {
                alert("Booking requested successfully Sended to Admin and Trainer! Please wait for approval you can check status in your viewbookings.");
                nav('/');
            } else if(response.data.status === 'dateerror'){
                alert("Please enter a valid date.");
            }
            else {
                alert("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during booking:", error);
            alert("An error occurred. Please try again later.");
        }
    };
    

    useEffect(() => {

        axios.get('http://localhost:8000/gettrainers')
            .then((response) => {
                setTrainerdata(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching trainer data:', error);
            });
    }, []);

    const handleduration=(selectedduration)=>{
       setDuration(selectedduration);
       setAmount(pricing[selectedduration] ||"");
       console.log("Selected Duration:", selectedduration);
       console.log("Mapped Amount:", pricing[selectedduration]);
    }
   
    
    return (
        <div className='dsa'>
            <button className="close-modal-btn" onClick={() => nav(-1)}>
                &times;
            </button>
            <div className='bookslots'>
                <form className='ner' onSubmit={book}>
                    <div className='div1'>
                        <label htmlFor="name" className='in1'>Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" className='in1' value={name} onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" name="phone" placeholder="Enter your phone number" className='in1' value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <div className='dt'>
                            <div className='dt1'>
                                <label htmlFor="date">Date:</label>
                                <input type="date" id="date" name="date" className='in2' value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="time">Time:</label>
                                <input type="time" id="time" name="time" className='in2' value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className='div1'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" placeholder="Enter your Email" className='in1' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <div className='dt'>
                            <div>
                                <label htmlFor="pool">Select Pool:</label>
                                <input type="text" id="email" name="email" placeholder="Enter your Email" className='in3' value={id} readOnly />
                            </div>
                            <div>
                                <label htmlFor="trainer">Select Trainer:</label>
                                <select id="trainer" name="trainer" className='in3' value={trainer} onChange={(e) => setTrainer(e.target.value)}>
                                    <option value="">Select Trainer</option>
                                    {trainerdata.map((item) => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                            <div className='dt'>
                                <div>
                        <label htmlFor="duration">Select Duration:</label>
                        <select id="duration" name="duration" className='in3' value={duration} onChange={(e) => handleduration(e.target.value)}>
                            <option value="">Select Duration</option>
                            <option value="30 min">30 min</option>
                            <option value="1 hr">1 hour</option>
                            <option value="2 hr">2 hour</option>
                            <option value="3 hr">3 hour</option>
                            <option value="4 hr">4 hour</option>
                        </select>
                        </div>
                        <div>
                        <label htmlFor="Amount">Amount:</label>
                        <input type="text" id="amount" name="amount" placeholder=" Amount" className='in3' value={amount} readOnly />
                            </div>  
                              </div>      
                        <br />
                        <button type="submit" className='bookyourslots'>Book your slots</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Bookslots;
