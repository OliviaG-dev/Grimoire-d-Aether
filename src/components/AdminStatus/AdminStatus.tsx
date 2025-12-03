import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import "./AdminStatus.css";

const AdminStatus: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="admin-status">
      <button
        className="admin-status-badge"
        onClick={() => setShowMenu(!showMenu)}
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
                <span className="admin-status-menu-label">
                  Connecté en tant que
                </span>
                <span className="admin-status-menu-email">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
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
            <SignOutButton>
              <button
                className="admin-status-menu-item admin-status-menu-item-danger"
                onClick={() => setShowMenu(false)}
              >
                <span className="admin-status-menu-item-icon">🚪</span>
                <span>Se déconnecter</span>
              </button>
            </SignOutButton>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStatus;
