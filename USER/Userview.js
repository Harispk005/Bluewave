import React, { useState } from 'react';
import './Userview.css';
import { Carousel } from 'react-bootstrap';
import bgg from './bgg1.jpg'
import bg from './bg.jpg'
import bg3 from './bg3.jpg' 
import bg4 from './bg4.jpg'



const Userview = () => {

  return (
    <>
      <div className='grid'>
        <div className="cont">
          <h1 className='hd'>Welcome to Blue Wave</h1>
          <p>
            Welcome to Blue Wave, your ultimate destination for all things swimming! Here, you can easily book slots at your preferred swimming pool, explore exciting swimming competitions, find the nearest pools around you, and access professional training sessions tailored to all skill levels. Dive into a world of aquatic opportunities designed to enhance your swimming experience.
          </p>
          <p>Start your swimming adventure with Blue Wave today!</p>
        </div>
        
        <div className="cont2">

          <img src={bgg} alt="Swimming pool" />
      
        </div>
      </div>
    </>
  );
};

export default Userview;
