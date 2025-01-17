import React from 'react'
import Usernav from './Usernav'
import Userview from './Userview'
import './Userhome.css'
import Pools from './Pools'
import Footers from './Footers'
import Features from './Features'

const Userhome = () => {
  return (
    <>
    <body className="bghom">
    <Usernav/>
    <Userview/>
    <Pools/>
    <Features/>
    <Footers/>
    </body>
   
    
    </>
  )
}

export default Userhome