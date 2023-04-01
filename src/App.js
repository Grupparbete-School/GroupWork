import React from "react";
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from './components/FirstPage'
import Dashbord from "./components/Dashbord";
import Login from './components/Login';
import FirstPage from './components/FirstPage';
import Project from './pages/Project';
import TimeAdd from './components/TimeAdd';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
 );
};

