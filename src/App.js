import React from "react";
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from './components/FirstPage'
import Dashbord from "./components/Dashbord";
import Login from './components/Login';
import Project from './pages/Project';
import Report from './pages/Report';
import Comment_ChangeStatus from './pages/Comment_ChangeStatus';
import CreateProject from "./pages/Create_Project";
import AddEmployee from "./pages/Add_Employee";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/project" element={<Project />} />
          <Route path="/report" element={<Report />} />
          <Route path="/comment_ChangeStatus" element={<Comment_ChangeStatus />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
 );
};

