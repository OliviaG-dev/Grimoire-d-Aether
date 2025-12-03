import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

// Composant pour nettoyer le hash de l'URL
const HashCleaner = () => {
  const location = useLocation();

  useEffect(() => {
    // Nettoyer le hash s'il ne contient pas de token important
    if (window.location.hash) {
      const hash = window.location.hash;
      const hasToken = hash.includes("token") || hash.includes("invite");
      
      if (!hasToken) {
        // Nettoyer le hash vide ou sans token
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    }
  }, [location]);

  return null;
};

function AppContent() {
  return (
    <>
      <HashCleaner />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
