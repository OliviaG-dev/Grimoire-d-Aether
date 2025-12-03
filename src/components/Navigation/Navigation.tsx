import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const currentPath = location.pathname;

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSignedIn) {
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
