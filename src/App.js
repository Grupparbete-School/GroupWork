
import React from "react";
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

