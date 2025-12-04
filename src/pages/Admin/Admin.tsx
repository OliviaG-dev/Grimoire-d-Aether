import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import {
  DashboardIcon,
  GamesIcon,
  CardsIcon,
  AddIcon,
  EditIcon,
  LogoutIcon,
} from "../../components/Icons";
import "./Admin.css";
import logo from "../../assets/logo.png";

interface Game {
  id: string;
  name: string;
  type: string;
  author: string;
  year: string;
  theme: string;
  coverImage?: string;
  description: string;
}

interface Card {
  id: string;
  gameId: string;
  name: string;
  image?: string;
  keywords?: string[];
  meaning?: string;
  love?: string;
  work?: string;
  energies?: {
    elements?: string[];
    chakras?: string[];
  };
  symbols?: string[];
}

type AdminView = "dashboard" | "games" | "cards";

const Admin: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [games] = useState<Game[]>([]);
  const [cards] = useState<Card[]>([]);

  // Afficher un loader pendant le chargement
  if (!isLoaded) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  // Rediriger vers login si pas connecté
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <div className="admin-header-left">
            <img src={logo} alt="Grimoire d'Áether" className="admin-logo" />
            <div>
              <h1 className="admin-title">Administration</h1>
              <p className="admin-subtitle">Grimoire d'Áether</p>
            </div>
          </div>
          <div className="admin-header-right">
            <span className="admin-user">
              {user?.primaryEmailAddress?.emailAddress || "Admin"}
            </span>
            <SignOutButton>
              <button className="admin-logout-btn">
                <LogoutIcon size={18} className="admin-icon" />
                <span>Déconnexion</span>
              </button>
            </SignOutButton>
          </div>
        </header>

        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${
              currentView === "dashboard" ? "active" : ""
            }`}
            onClick={() => setCurrentView("dashboard")}
          >
            <DashboardIcon size={20} className="admin-nav-icon" />
            <span>Tableau de bord</span>
          </button>
          <button
            className={`admin-nav-btn ${
              currentView === "games" ? "active" : ""
            }`}
            onClick={() => setCurrentView("games")}
          >
            <GamesIcon size={20} className="admin-nav-icon" />
            <span>Jeux</span>
          </button>
          <button
            className={`admin-nav-btn ${
              currentView === "cards" ? "active" : ""
            }`}
            onClick={() => setCurrentView("cards")}
          >
            <CardsIcon size={20} className="admin-nav-icon" />
            <span>Cartes</span>
          </button>
        </nav>

        <main className="admin-main">
          {currentView === "dashboard" && (
            <div className="admin-view">
              <h2>Tableau de bord</h2>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <h3>{games.length}</h3>
                  <p>Jeux</p>
                </div>
                <div className="admin-stat-card">
                  <h3>{cards.length}</h3>
                  <p>Cartes</p>
                </div>
              </div>
            </div>
          )}

          {currentView === "games" && (
            <div className="admin-view">
              <div className="admin-view-header">
                <h2>Gestion des Jeux</h2>
                <button className="admin-add-btn">
                  <AddIcon size={20} className="admin-icon" />
                  <span>Ajouter un jeu</span>
                </button>
              </div>
              <div className="admin-list">
                {games.length === 0 ? (
                  <p className="admin-empty">Aucun jeu pour le moment.</p>
                ) : (
                  games.map((game) => (
                    <div key={game.id} className="admin-item">
                      <h3>{game.name}</h3>
                      <p>{game.type}</p>
                      <button className="admin-edit-btn">
                        <EditIcon size={16} className="admin-icon" />
                        <span>Éditer</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {currentView === "cards" && (
            <div className="admin-view">
              <div className="admin-view-header">
                <h2>Gestion des Cartes</h2>
                <button className="admin-add-btn">
                  <AddIcon size={20} className="admin-icon" />
                  <span>Ajouter une carte</span>
                </button>
              </div>
              <div className="admin-list">
                {cards.length === 0 ? (
                  <p className="admin-empty">Aucune carte pour le moment.</p>
                ) : (
                  cards.map((card) => (
                    <div key={card.id} className="admin-item">
                      <h3>{card.name}</h3>
                      <p>Jeu: {card.gameId}</p>
                      <button className="admin-edit-btn">
                        <EditIcon size={16} className="admin-icon" />
                        <span>Éditer</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
