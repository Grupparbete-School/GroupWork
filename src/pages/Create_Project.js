import React from "react";
import Navbar from '../components/Navbar'; import Navbar2 from '../components/Navbar2';
import CreateProject from '../components/CreateProject';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Create_Project() {

  let NavbarOne = ""; 
  let MainContent = ""; 
  
  let userRole = localStorage.getItem("userRole") 

  return (
    <div className='backgroundColor'> 
      <Navbar2 /> 
      <div className='container-MainContent'>
      <CreateProject/>
      </div>
    </div>
  );
}


