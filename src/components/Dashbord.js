import React from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
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
      </div>
    );
};