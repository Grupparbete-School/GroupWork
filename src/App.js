import Header from './components/Header';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import TimePage from './pages/TimeDist';
import ProjectPage from './pages/Project';
import ReportPage from './pages/Report';
import MyProfil from './pages/MyProfil';
import Settings from './pages/Settings';
import LogOut from './pages/LogOut';
import {BrowserRouter as HashRouter, Route, Routes} from "react-router-dom";



function App() {

  return (
      <HashRouter>
        <Header>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/timeDist" element={<TimePage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/myprofil" element={<MyProfil />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </Header>
      </HashRouter> 
  );
}

export default App;
