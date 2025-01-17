import React, { useEffect, useState } from 'react'
import './Features.css'
import ss from './ss.png'
import md from './md.png'
import sl from './sl.png'
import ct from './ct.png'
import { useNavigate } from 'react-router-dom'

const Features = () => {
    const[islogsuccess,setIslogsuccess]=useState(false);
    const nav=useNavigate();
    const lid=sessionStorage.getItem('lid');
    
    useEffect(() => {
      
        if(lid){
            setIslogsuccess(true);
        }
    },[])
    
    const book=()=>{
        if(!islogsuccess){
            alert('Please login first');
            nav('/login');
        }
     else if(islogsuccess){
        nav('/bookslots');
     }
    }

    const viewcompetition=()=>{
        if(!islogsuccess){
            alert('Please login first');
            nav('/login');
        }
     else if(islogsuccess){
        nav('/viewcompetition');
     }
    }

    const viewtrainers=()=>{
        if(!islogsuccess){
            alert('Please login first');
            nav('/login');
        }
     else if(islogsuccess){
        nav('/viewtrainers');
     }
    }
    const pool=()=>{
        if(!islogsuccess){
            alert('Please login first');
            nav('/login');
        }
     else if(islogsuccess){
        nav('/allpools');
     }
    }
    return (
        <>

<div className='hdr'>

<h1 className='rdh'>Our Services</h1>
<br/>
<p>Discover a world of aquatic opportunities</p>

</div>




        <div className='features'>

            <div className='feat'>

                <div className='fea-img'>
                    <img className='img' src={ss} alt='fea' />
                </div>


                <div className='fea-cont'>
                    <span className='fea-hd'>Personal Training</span>
                    <p>Get personalized swim training with our expert coaches! Perfect for all skill levels, our one-on-one sessions help you build confidence, improve technique, and reach your goals faster. Dive in and make every swim count!"
                    </p>
                   
                </div>
                <div className='btm'> <button className='feature-button' onClick={viewtrainers}>Book Now</button></div>

            </div>

{/* 2nd */}

<div className='feat'>

<div className='fea-img'>
    <img className='ig' src={md} alt='fea' />
</div>


<div className='fea-cont'>
    <span className='fea-hd'>Swimming Competitions</span>
    <p>Join our exciting swimming competitions and challenge yourself! showcase your skills, and experience the thrill of the race. Whether you're a beginner or seasoned swimmer, there's a place for you
    </p>
   
</div>
<div className='btm'> <button className='fbtn' onClick={viewcompetition}>Check Events</button></div>
</div>

{/* 3rd */}
<div className='feat'>

<div className='fea-img'>
    <img className='mg' src={sl } alt='fea' />
</div>


<div className='fea-cont'>
    <span className='fea-hd'>Easy Booking</span>
    <p>Booking your swim slot has never been easier! Simply choose your preferred time, reserve your spot, and get ready to dive in. Quick, convenient, and hassle-free – secure your slot today
    </p>
   



</div>
<div className='btm'> <button className='feature-button' onClick={pool}>Book Now</button></div>
</div>

{/* 4th */}
<div className='feat'>

<div className='fea-img'>
    <img className='gmi' src={ct} alt='fea' />
</div>


<div className='fea-cont'>
    <span className='fea-hd'>Chat with Coaches</span>
    <p>Connect with our coaches by sending a request to chat! Chat directly with them for personalized advice, tips, and support. Whether you have a question or need guidance, help is just a message away!
    </p>
    



</div>
<div className='btm'><button className='feature-button' onClick={viewtrainers}>Chat Now</button></div>
</div>

        </div>
</>
    )
}

export default Features