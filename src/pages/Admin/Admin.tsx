import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import {
  DashboardIcon,
  GamesIcon,
  CardsIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  LogoutIcon,
} from "../../components/Icons";
import { gamesService } from "../../services/gamesService";
import { cardsService } from "../../services/cardsService";
import type { Game, Card } from "../../types/models";
import AddGameForm from "../../components/AddGameForm/AddGameForm";
import AddCardForm from "../../components/AddCardForm/AddCardForm";
import "./Admin.css";
import logo from "../../assets/logo.png";

type AdminView = "dashboard" | "games" | "cards";

const Admin: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [games, setGames] = useState<Game[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [filterGameId, setFilterGameId] = useState<string>("");
  const [filterIndex, setFilterIndex] = useState<string>("");
  const [showAddGameForm, setShowAddGameForm] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [gamesData, cardsData] = await Promise.all([
          gamesService.getAll(),
          cardsService.getAll(),
        ]);
        setGames(gamesData);
        setCards(cardsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleGameAdded = async () => {
    setShowAddGameForm(false);
    setEditingGame(null);
    try {
      const gamesData = await gamesService.getAll();
      setGames(gamesData);
    } catch (error) {
      console.error("Erreur lors du rechargement des jeux:", error);
    }
  };

  const handleCardAdded = async () => {
    setShowAddCardForm(false);
    setEditingCard(null);
    try {
      const cardsData = await cardsService.getAll();
      setCards(cardsData);
    } catch (error) {
      console.error("Erreur lors du rechargement des cartes:", error);
    }
  };

  const getGameName = (gameId: string) =>
    games.find((g) => g.id === gameId)?.name || gameId;

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setShowAddGameForm(true);
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setShowAddCardForm(true);
  };

  const handleDeleteGame = async (game: Game) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer le jeu "${game.name}" ? Cette action est irréversible.`
      )
    ) {
      try {
        await gamesService.delete(game.id);
        const gamesData = await gamesService.getAll();
        setGames(gamesData);
      } catch (error) {
        console.error("Erreur lors de la suppression du jeu:", error);
        alert("Erreur lors de la suppression du jeu");
      }
    }
  };

  const handleDeleteCard = async (card: Card) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer la carte "${card.name}" ? Cette action est irréversible.`
      )
    ) {
      try {
        await cardsService.delete(card.id);
        const cardsData = await cardsService.getAll();
        setCards(cardsData);
      } catch (error) {
        console.error("Erreur lors de la suppression de la carte:", error);
        alert("Erreur lors de la suppression de la carte");
      }
    }
  };

  const filteredCards = cards.filter((card) => {
    const matchGame = filterGameId ? card.gameId === filterGameId : true;
    const matchIndex =
      filterIndex.trim() === ""
        ? true
        : String(card.index ?? "").toLowerCase() === filterIndex.trim().toLowerCase();
    return matchGame && matchIndex;
  });

  // Afficher un loader pendant le chargement
  if (!isLoaded || loading) {
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
            <button
              className="admin-home-btn"
              onClick={() => navigate("/")}
              title="Retour à l'accueil"
            >
              <span>Accueil</span>
            </button>
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
                <button
                  className="admin-add-btn"
                  onClick={() => setShowAddGameForm(true)}
                >
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
                      {game.coverImage && (
                        <div className="admin-item-image">
                          <img
                            src={game.coverImage}
                            alt={game.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                      <h3>{game.name}</h3>
                      <p>{game.type}</p>
                      <div className="admin-item-actions">
                        <button
                          className="admin-edit-btn"
                          onClick={() => handleEditGame(game)}
                        >
                          <EditIcon size={16} className="admin-icon" />
                          <span>Éditer</span>
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDeleteGame(game)}
                        >
                          <DeleteIcon size={16} className="admin-icon" />
                          <span>Supprimer</span>
                        </button>
                      </div>
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
                <button
                  className="admin-add-btn"
                  onClick={() => setShowAddCardForm(true)}
                >
                  <AddIcon size={20} className="admin-icon" />
                  <span>Ajouter une carte</span>
                </button>
              </div>
              <div className="admin-filters">
                <div className="admin-filter">
                  <label htmlFor="filter-game">Filtrer par jeu</label>
                  <select
                    id="filter-game"
                    value={filterGameId}
                    onChange={(e) => setFilterGameId(e.target.value)}
                  >
                    <option value="">Tous les jeux</option>
                    {games.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-filter">
                  <label htmlFor="filter-index">Filtrer par index</label>
                  <input
                    id="filter-index"
                    type="number"
                    inputMode="numeric"
                    value={filterIndex}
                    onChange={(e) => setFilterIndex(e.target.value)}
                    placeholder="ex: 12"
                  />
                </div>
              </div>
              <div className="admin-list">
                {filteredCards.length === 0 ? (
                  <p className="admin-empty">Aucune carte pour le moment.</p>
                ) : (
                  filteredCards.map((card) => (
                    <div key={card.id} className="admin-item">
                      {card.index !== undefined && card.index !== null ? (
                        <div className="admin-item-index">{card.index}</div>
                      ) : null}
                      {card.image ? (
                        <div className="admin-item-image">
                          <img src={card.image} alt={card.name} />
                        </div>
                      ) : null}
                      <h3>{card.name}</h3>
                      <p>Jeu: {getGameName(card.gameId)}</p>
                      {card.isFavorite && (
                        <span className="admin-item-favorite">⭐ Favori</span>
                      )}
                      <div className="admin-item-actions">
                        <button
                          className="admin-edit-btn"
                          onClick={() => handleEditCard(card)}
                        >
                          <EditIcon size={16} className="admin-icon" />
                          <span>Éditer</span>
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDeleteCard(card)}
                        >
                          <DeleteIcon size={16} className="admin-icon" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {showAddGameForm && (
        <AddGameForm
          onSuccess={handleGameAdded}
          onCancel={() => {
            setShowAddGameForm(false);
            setEditingGame(null);
          }}
          game={editingGame || undefined}
        />
      )}

      {showAddCardForm && (
        <AddCardForm
          onSuccess={handleCardAdded}
          onCancel={() => {
            setShowAddCardForm(false);
            setEditingCard(null);
          }}
          card={editingCard || undefined}
        />
      )}
    </div>
  );
};

export default Admin;
