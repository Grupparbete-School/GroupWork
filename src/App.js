import React from "react";
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import FirstPage from './components/FirstPage';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
 );
};
