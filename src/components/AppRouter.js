import React from 'react';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Project from '../pages/Project';
import Report from '../pages/Report';
import Information from '../pages/Information';
import MyProfil from '../pages/MyProfil';
import Settings from '../pages/Settings';
import LogOut from '../pages/LogOut';
import {HashRouter, Route, Routes} from "react-router-dom";

export default function AppRouter (){
  return(
    <HashRouter>
      <Navbar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/report" element={<Report />} />
          <Route path="/information" element={<Information />} />
          <Route path="/myprofil" element={<MyProfil />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </Navbar>
    </HashRouter> 
  );
};