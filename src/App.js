import React from "react";
// import AppRouter from './components/AppRouter';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashbord from "./components/Dashbord";
import Login from './test/test';

export default function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/dashbord" element={<Dashbord />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };
