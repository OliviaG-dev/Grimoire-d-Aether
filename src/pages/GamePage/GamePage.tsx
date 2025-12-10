import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./GamePage.css";
import { gamesService } from "../../services/gamesService";
import { cardsService } from "../../services/cardsService";
import type { Game } from "../../types/models";
import type { Card } from "../../types/models";
import Navigation from "../../components/Navigation/Navigation";
import logo from "../../assets/logo.png";
import AdminStatus from "../../components/AdminStatus/AdminStatus";

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGameData = async () => {
      if (!id) {
        setError("ID du jeu manquant");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const [gameData, cardsData] = await Promise.all([
          gamesService.getById(id),
          cardsService.getByGameId(id),
        ]);

        if (!gameData) {
          setError("Jeu non trouvé");
          setLoading(false);
          return;
        }

        setGame(gameData);
        setCards(cardsData);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du jeu:", err);
        setError(
          err instanceof Error 
            ? `Erreur: ${err.message}` 
            : "Erreur lors du chargement des données. Vérifiez votre connexion et la configuration Supabase."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGameData();
  }, [id]);

  if (loading) {
    return (
      <div className="game-page">
        <div className="game-container">
          <div className="game-loading">
            <h2>Chargement du jeu...</h2>
            <p>Veuillez patienter</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="game-page">
        <div className="game-container">
          <div className="game-error">
            <h2>Erreur</h2>
            <p>{error || "Jeu non trouvé"}</p>
            <Link to="/" className="game-back-link">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="game-container">
        <header className="game-header">
          <div className="game-header-left">
            <img src={logo} alt="Grimoire d'Áether" className="game-logo" />
            <h1 className="game-title">Le Grimoire d'Áether</h1>
          </div>
          <AdminStatus />
        </header>

        <Navigation />

        <div className="game-content">
          <div className="game-info">
            <div className="game-info-header">
              {game.coverImage && (
                <div className="game-cover">
                  <img
                    src={game.coverImage}
                    alt={game.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="game-info-text">
                <h2 className="game-name">{game.name}</h2>
                <div className="game-meta">
                  <span className="game-type">{game.type}</span>
                  {game.author && (
                    <span className="game-author">par {game.author}</span>
                  )}
                  {game.year && (
                    <span className="game-year">{game.year}</span>
                  )}
                </div>
                {game.theme && (
                  <p className="game-theme">
                    <strong>Thème :</strong> {game.theme}
                  </p>
                )}
                {game.cardCount && (
                  <p className="game-card-count">
                    <strong>Nombre de cartes :</strong> {game.cardCount}
                  </p>
                )}
              </div>
            </div>

            {game.description && (
              <div className="game-description">
                <h3>Description</h3>
                <p>{game.description}</p>
              </div>
            )}
          </div>

          <div className="game-cards-section">
            <h3 className="game-cards-title">
              Cartes du jeu ({cards.length})
            </h3>
            {cards.length === 0 ? (
              <p className="game-no-cards">
                Aucune carte disponible pour ce jeu.
              </p>
            ) : (
              <div className="game-cards-grid">
                {cards.map((card) => (
                  <Link
                    key={card.id}
                    to={`/card/${card.id}`}
                    className="game-card-item"
                  >
                    {card.image && (
                      <div className="game-card-image">
                        <img
                          src={card.image}
                          alt={card.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    )}
                    <h4 className="game-card-name">{card.name}</h4>
                    {card.keywords && card.keywords.length > 0 && (
                      <p className="game-card-keywords">
                        {card.keywords.join(", ")}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
