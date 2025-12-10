import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Admin from "./pages/Admin/Admin";
import Games from "./pages/Games/Games";
import GamePage from "./pages/GamePage/GamePage";
import CardPage from "./pages/CardPage/CardPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/card/:id" element={<CardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
