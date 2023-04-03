import React from "react";
import Navbar from '../components/Navbar'; import Navbar2 from '../components/Navbar2';
import AllProjectsUser from "../components/AllProjectsUser";
import FetchProjects from '../components/FetchProjects';

import "bootstrap/dist/css/bootstrap.min.css";


export default function PageChangeTime() {

  let NavbarOne = ""; 
  let MainContent = ""; 
  
  let userRole = localStorage.getItem("userRole") 

  if (userRole === 'user') { 
    NavbarOne = <Navbar /> 
    MainContent = <AllProjectsUser />; 
  } else { 
    NavbarOne = <Navbar2 /> 
    MainContent = <FetchProjects /> 
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

