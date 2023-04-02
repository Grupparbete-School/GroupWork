import React from "react";
import Navbar from '../components/Navbar'; import Navbar2 from '../components/Navbar2';
// import ChangeStatus from "../components/ChangeStatus";
import AddComment from '../components/AddComment';

import "bootstrap/dist/css/bootstrap.min.css";


export default function Comment_ChangeStatus() {

  let NavbarOne = ""; 
  let MainContent = ""; 
  
  let userRole = localStorage.getItem("userRole") 

  if (userRole === 'user') { 
    NavbarOne = <Navbar /> 
    MainContent = <AddComment />; 
  } else { 
    NavbarOne = <Navbar2 /> 
    MainContent = "";
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


