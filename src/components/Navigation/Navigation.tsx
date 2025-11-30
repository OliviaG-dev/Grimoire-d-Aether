import React from "react";
import "./Navigation.css";

interface NavigationProps {
  currentPath?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath = "/" }) => {
  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/games", label: "Jeux" },
    { path: "/cards", label: "Cartes" },
    { path: "/admin", label: "Admin" },
  ];

  return (
    <nav className="navigation-v4">
      <div className="nav-container-v4">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              className={`nav-link-v4 ${isActive ? "active" : ""}`}
            >
              <span className="nav-dot"></span>
              <span className="nav-text-v4">{item.label}</span>
              {isActive && <span className="nav-glow"></span>}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
