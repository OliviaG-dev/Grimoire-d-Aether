import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStatus.css";

declare global {
  interface Window {
    netlifyIdentity?: any;
  }
}

const AdminStatus: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init();

        // Vérifier le statut de connexion
        const currentUser = window.netlifyIdentity.currentUser();
        if (currentUser) {
          setIsLoggedIn(true);
          setUserEmail(currentUser.email);
        } else {
          setIsLoggedIn(false);
          setUserEmail(null);
        }
        setIsLoading(false);

        // Écouter les changements de statut
        window.netlifyIdentity.on("login", (user: any) => {
          setIsLoggedIn(true);
          setUserEmail(user.email);
        });

        window.netlifyIdentity.on("logout", () => {
          setIsLoggedIn(false);
          setUserEmail(null);
          setShowMenu(false);
        });
      } else {
        // Attendre que le script se charge
        const checkInterval = setInterval(() => {
          if (window.netlifyIdentity) {
            clearInterval(checkInterval);
            checkAuthStatus();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          setIsLoading(false);
        }, 5000);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
      setShowMenu(false);
    }
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="admin-status">
      <button
        className="admin-status-badge"
        onClick={handleToggleMenu}
        aria-label="Menu administrateur"
      >
        <span className="admin-status-icon">🔮</span>
        <span className="admin-status-text">Admin</span>
      </button>

      {showMenu && (
        <>
          <div
            className="admin-status-overlay"
            onClick={() => setShowMenu(false)}
          />
          <div className="admin-status-menu">
            <div className="admin-status-menu-header">
              <span className="admin-status-menu-icon">👤</span>
              <div className="admin-status-menu-user">
                <span className="admin-status-menu-label">Connecté en tant que</span>
                <span className="admin-status-menu-email">{userEmail}</span>
              </div>
            </div>
            <div className="admin-status-menu-divider"></div>
            <button
              className="admin-status-menu-item"
              onClick={() => {
                navigate("/admin");
                setShowMenu(false);
              }}
            >
              <span className="admin-status-menu-item-icon">⚙️</span>
              <span>Panneau d'administration</span>
            </button>
            <button
              className="admin-status-menu-item admin-status-menu-item-danger"
              onClick={handleLogout}
            >
              <span className="admin-status-menu-item-icon">🚪</span>
              <span>Se déconnecter</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStatus;


