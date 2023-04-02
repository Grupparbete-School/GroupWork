import React from "react";
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from './components/FirstPage'
import Dashbord from "./components/Dashbord";
import Login from './components/Login'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
 );
};

