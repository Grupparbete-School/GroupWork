import Header from './components/Header';
import RegisterPage from './pages/Register';
import ProjectPage from './pages/Project';
import TimePage from './pages/TimeDist';
import {BrowserRouter as HashRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
      <HashRouter>
        <Header>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/timeDist" element={<TimePage />} />
          </Routes>
        </Header>
      </HashRouter> 
  );
}

export default App;
