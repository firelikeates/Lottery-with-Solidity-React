import React from 'react'
import {NavLink} from "react-router-dom"
import "./CSS/Header.css"

const HeaderProject = () => {
  return (
    <header>
      <nav>
        <div className="left-part">Lottery With ETH</div>
        <div className="right-part">
            <NavLink to={"/AboutPage"}>About Us</NavLink> 
        </div>
      </nav>
    </header>
  )
}

export default HeaderProject