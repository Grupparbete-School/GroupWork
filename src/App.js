
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashbord from "./components/Dashbord";
import Login from './components/Login'
import FetchPeople2 from './test/ActiveProjects';

export default function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/dashbord/*" element={<Dashbord />} />
            <Route path="/" element={<Login />} />
            <Route path="/test" element={<FetchPeople2 />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };

// export default function App() {
//     return (
//       <div className="App">
//         <BrowserRouter>
//           <Routes>
//             <Route path="/dashbord" element={<Dashbord />} />
//             <Route path="/" element={<Login />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//    );
// };

