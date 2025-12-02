import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/games", label: "Jeux" },
    { path: "/cards", label: "Cartes" },
    { path: "/login", label: "Admin" },
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
