import React from "react";
import "./style.css";
import { NavLink } from 'react-router-dom';

function Header() {

  return (
    <div>
      <div className='NavBar' >
            
            <NavLink to={"/"}>Signup</NavLink>
            <NavLink to={"/podcasts"}>Podcasts</NavLink>
            <NavLink to={"/startApodcast"}>Start A Podcast</NavLink>
            <NavLink to={"/profile"}>Profile</NavLink>
    </div>
    </div>
  );
}

export default Header;