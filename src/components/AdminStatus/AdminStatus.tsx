import React, { useState } from "react";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import { CrystalIcon, UserIcon, LogoutIcon } from "../Icons";
import "./AdminStatus.css";

const AdminStatus: React.FC = () => {
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
        <CrystalIcon className="admin-status-icon" size={18} />
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
              <UserIcon className="admin-status-menu-icon" size={24} />
              <div className="admin-status-menu-user">
                <div className="admin-status-menu-email-row">
                  <span className="admin-status-menu-email">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span>
                  <SignOutButton>
                    <button
                      className="admin-status-logout-btn"
                      onClick={() => setShowMenu(false)}
                      aria-label="Se déconnecter"
                    >
                      <LogoutIcon size={18} />
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStatus;
