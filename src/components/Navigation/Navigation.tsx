import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier le statut de connexion pour le lien Admin
    const checkAuth = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init();
        const currentUser = window.netlifyIdentity.currentUser();
        setIsLoggedIn(!!currentUser);
      }
    };

    checkAuth();

    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("login", () => setIsLoggedIn(true));
      window.netlifyIdentity.on("logout", () => setIsLoggedIn(false));
    }
  }, []);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const navItems: Array<{
    path: string;
    label: string;
    onClick?: (e: React.MouseEvent) => void;
  }> = [
    { path: "/", label: "Accueil" },
    { path: "/games", label: "Jeux" },
    { path: "/cards", label: "Cartes" },
    { path: "/admin", label: "Admin", onClick: handleAdminClick },
  ];

  return (
    <nav className="navigation-v4">
      <div className="nav-container-v4">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={item.onClick}
              className={`nav-link-v4 ${isActive ? "active" : ""}`}
            >
              <span className="nav-dot"></span>
              <span className="nav-text-v4">{item.label}</span>
              {isActive && <span className="nav-glow"></span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
