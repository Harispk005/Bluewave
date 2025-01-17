import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './pools.css'
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Pools = () => {

    const [pools, setPools] = useState([]);
    const[islogsuccess,setIslogsuccess]=useState(false);
    const lid=sessionStorage.getItem('lid');
    useEffect(() => {
        if(lid){
            setIslogsuccess(true);
        }
    }, [])
    

    const imgurl = 'http://localhost:8000/';

    useEffect(() => {
        axios.get('http://localhost:8000/getpools')
            .then((response) => {
                const sortedData = response.data.data.sort((a, b) => (a.name.localeCompare(b.name)));
                const lastThree = sortedData.slice(-3);

                setPools(lastThree);
                console.log(response.data.data);
            })
    }, []);

    const nav = useNavigate();
    const zoompool=()=>{
        nav('/zoompool/:id');
    }
    const allpools=()=>{
        if(!islogsuccess){
            alert('Please login first');
            nav('/login');
        }
        else if(islogsuccess){
        nav('/allpools');
        }
    }

    return (
        <div class="featured-section">
            <h2>Featured Pools</h2>
            <p>Explore Our Best Pools: Experience Comfort, Style, and Convenience</p>
            <div class="card-container">
                {pools.map((item) => (
                    <div class="card">
                        <img src={imgurl + item.Image} alt="Pool Image" />
                        <h3 className='name'>{item.name}</h3>
                        <div class="info">
                            <p><i class="fas fa-map-marker-alt"></i> Location:{item.location}</p>
                            <p><i class="fas fa-home"></i> Type:{item.type} </p>
                        </div>
                        <button className='view' onClick={()=>nav(`/zoompool/${item._id}`)}>View</button>
                    </div>
                ))}
            </div>

            <button className='viewmore' onClick={allpools}>View More<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#321D71"><path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z"/></svg></button>

            
        </div>

    )
}

export default Pools