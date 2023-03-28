import React from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import { useEffect, useState } from 'react';

export default function Dashboard(){
    //Skapar useState för datan vi ska spara.
    const [userRole, setRole] = useState("");
    const [userName, setName] = useState("");
    const [userEmail, setEmail] = useState("");

    useEffect(() => {
        //Skapar en instans av en funktion som hämtar länken från webbläsaren.
        const searchParams = new URLSearchParams(window.location.search);

        //Skapar 3 variabler för varje del av datan vi ska hämta.
        //första delen med searchParams.get() <<< hämtar data utifrån det som finns inuti strängen:
            //t.ex om strängen är www.facebook.com?userRole=admin&userName=aldor
            //då hämtas det som specificeras inuti "get" och sparas i variabeln.
        //Andra delen med localStorage.getItem() <<< kollar om det finns data inuti webbläsarens "local Storage"
        //Sista alternativet om både länken och localstorage är tomma så vill vi att det sparas en tom sträng istället för "undefinde".
        const role = searchParams.get('userRole') || localStorage.getItem('userRole') || "";
        const name = searchParams.get('userName') || localStorage.getItem('userName') || "";
        const email = searchParams.get('userEmail') || localStorage.getItem('userEmail') || "";

        //Här lägger vi till innehållet via set i useState variablerna ovan.
        setRole(role);
        setName(name);
        setEmail("");

        //här sätter vi innehållet av variablerna till webbläsarens localStorage
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        console.log(userRole + " " + userName + " " + userEmail);
        
        //Den här delen är viktig då den uppdaterar länken i webbläsaren så att den motsvarar den första delen i länken.
        //med "första delen" menas allt som ligger före ett "?"tecken i länken.
        //kan vara localhost:3000 eller localhost:3000/home/whatever.

        //här sparar vi första delen av länken i en variabel
        const newUrl = `${window.location.pathname}`;
        //och här uppdaterar vi länken utan att uppdatera sidan!
        window.history.pushState({}, '', newUrl);

    }, [userRole, userName, userEmail]);
    
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