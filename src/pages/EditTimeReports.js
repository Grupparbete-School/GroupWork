import React from "react";
import Navbar from '../components/Navbar'; import Navbar2 from '../components/Navbar2';
import CreateProject from '../components/CreateProject';
import "bootstrap/dist/css/bootstrap.min.css";
import EditTime from "../components/EditTimeReport";

export default function Edit_Time() {


  
  let userRole = localStorage.getItem("userRole") 

  return (
    <div className='backgroundColor'> 
      <Navbar /> 
      <div className='container-MainContent'>
      <EditTime/>
      </div>
    </div>
  );
}


