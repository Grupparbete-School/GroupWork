import React from 'react';
import Header from '../components/Header';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Time from '../pages/TimeDist';
import Project from '../pages/Project';
import Report from '../pages/Report';
import MyProfil from '../pages/MyProfil';
import Settings from '../pages/Settings';
import LogOut from '../pages/LogOut';
import {HashRouter, Route, Routes} from "react-router-dom";

export default function AppRouter (){
    return(
        <HashRouter>
        <Header>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/timeDist" element={<Time />} />
            <Route path="/project" element={<Project />} />
            <Route path="/report" element={<Report />} />
            <Route path="/myprofil" element={<MyProfil />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </Header>
      </HashRouter> 
    );
};