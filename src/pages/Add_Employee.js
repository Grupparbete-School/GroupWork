import React from "react";
import Navbar from '../components/Navbar'; import Navbar2 from '../components/Navbar2';
import AddEmployee from '../components/AddEmployee';

import "bootstrap/dist/css/bootstrap.min.css";


export default function Add_Employee() {

  let NavbarOne = ""; 
  let MainContent = ""; 
  
  let userRole = localStorage.getItem("userRole") 

  return (
    <div className='backgroundColor'> 
       <Navbar2 />
      <div className='container-MainContent'>
      <AddEmployee />
      </div>
    </div>
  );
}


