import React from "react";
import Navbar from '../components/Navbar'; import Navbar2 from '../components/Navbar2';
import ChangeTime from "../components/ChangeTime";
import TimeAdd from '../components/TimeAdd';

import "bootstrap/dist/css/bootstrap.min.css";


export default function Report() {

  let NavbarOne = ""; 
  let MainContent = ""; 
  
  let userRole = localStorage.getItem("userRole") 

  if (userRole === 'user') { 
    NavbarOne = <Navbar /> 
    MainContent = <TimeAdd />; 
  } else { 
    NavbarOne = <Navbar2 /> 
    MainContent = <ChangeTime /> 
  } 
  
  return (
    <div className='backgroundColor'> 
    
      {NavbarOne}
      <div className='container-MainContent'>
      {MainContent}
      </div>
    </div>
  );
}


