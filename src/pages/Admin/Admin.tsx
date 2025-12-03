import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [games, setGames] = useState<Game[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const loadData = async () => {
    // Charger les jeux
    try {
      // Pour l'instant, on utilisera une liste vide
      // Plus tard, on chargera depuis les fichiers JSON
      await fetch("/src/data/games");
      setGames([]);
    } catch (error) {
      console.error("Erreur lors du chargement des jeux:", error);
    }

    // Charger les cartes
    try {
      await fetch("/src/data/cards");
      setCards([]);
    } catch (error) {
      console.error("Erreur lors du chargement des cartes:", error);
    }
  };

  useEffect(() => {
    // Nettoyer le hash de l'URL au chargement
    if (window.location.hash && !window.location.hash.includes("token")) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    // Vérifier l'authentification
    const checkAuth = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init();

        const currentUser = window.netlifyIdentity.currentUser();
        if (currentUser) {
          setIsAuthenticated(true);
          setUserEmail(currentUser.email);
          setIsLoading(false);
          loadData();
          // Nettoyer le hash après vérification
          if (window.location.hash && !window.location.hash.includes("token")) {
            window.history.replaceState(
              null,
              "",
              window.location.pathname + window.location.search
            );
          }
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
          navigate("/login", { replace: true });
        }

        // Écouter les changements
        window.netlifyIdentity.on("login", (user) => {
          if (user && "email" in user) {
            setIsAuthenticated(true);
            setUserEmail(user.email);
            loadData();
            // Nettoyer le hash de l'URL
            if (
              window.location.hash &&
              !window.location.hash.includes("token")
            ) {
              window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search
              );
            }
          }
        });

        window.netlifyIdentity.on("logout", () => {
          setIsAuthenticated(false);
          navigate("/");
        });
      } else {
        // Attendre que le script se charge
        const checkInterval = setInterval(() => {
          if (window.netlifyIdentity) {
            clearInterval(checkInterval);
            checkAuth();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          if (!window.netlifyIdentity) {
            setIsLoading(false);
          }
        }, 5000);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Afficher un message de redirection pendant la vérification
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
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
            <span className="admin-user">{userEmail}</span>
            <button className="admin-logout-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </header>

        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${
              currentView === "dashboard" ? "active" : ""
            }`}
            onClick={() => setCurrentView("dashboard")}
          >
            📊 Tableau de bord
          </button>
          <button
            className={`admin-nav-btn ${
              currentView === "games" ? "active" : ""
            }`}
            onClick={() => setCurrentView("games")}
          >
            🎴 Jeux
          </button>
          <button
            className={`admin-nav-btn ${
              currentView === "cards" ? "active" : ""
            }`}
            onClick={() => setCurrentView("cards")}
          >
            🃏 Cartes
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
                <button className="admin-add-btn">+ Ajouter un jeu</button>
              </div>
              <div className="admin-list">
                {games.length === 0 ? (
                  <p className="admin-empty">Aucun jeu pour le moment.</p>
                ) : (
                  games.map((game) => (
                    <div key={game.id} className="admin-item">
                      <h3>{game.name}</h3>
                      <p>{game.type}</p>
                      <button>Éditer</button>
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
                <button className="admin-add-btn">+ Ajouter une carte</button>
              </div>
              <div className="admin-list">
                {cards.length === 0 ? (
                  <p className="admin-empty">Aucune carte pour le moment.</p>
                ) : (
                  cards.map((card) => (
                    <div key={card.id} className="admin-item">
                      <h3>{card.name}</h3>
                      <p>Jeu: {card.gameId}</p>
                      <button>Éditer</button>
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
