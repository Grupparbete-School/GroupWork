import React from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Home from '../pages/Home';
import Project from '../pages/Project';
import Report from '../pages/Report';
import Information from '../pages/Information';
import MyProfil from '../pages/MyProfil';
import Settings from '../pages/Settings';
import LogOut from '../pages/LogOut';
import {Route, Routes} from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Dashboard(){
    const [userRole, setRole] = useState("");
    const [userName, setName] = useState("");
    const [userEmail, setEmail] = useState("");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const role = searchParams.get('userRole');
        const name = searchParams.get('userName');
        const email = searchParams.get('userEmail');

        setRole(role);
        setName(name);
        setEmail(email);

        console.log(userRole + " " + userName + " " + userEmail);
        // const newUrl = `${window.location.pathname}`;
        // window.history.pushState({}, '', newUrl);
    }, [userEmail,userName,userRole]);
    useEffect(() => {
        console.log(userRole + " " + userName + " " + userEmail);
    }, [userEmail,userName,userRole]);

    let NavbarOne = "";
    if (userRole === 'user'){
      NavbarOne = <Navbar />
      
    } else{
      NavbarOne = <Navbar2 />
    }
    // userRole === 'user'? NavbarOne = <Navbar /> : NavbarOne = <Navbar2 />
    return (
      <div>
        {NavbarOne}
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/project" element={<Project />} />
              <Route path="/report" element={<Report />} />
              <Route path="/information" element={<Information />} />
              <Route path="/myprofil" element={<MyProfil />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<LogOut />} />
            </Routes>
      </div>
    );
};