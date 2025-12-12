import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CardPage.css";
import { cardsService } from "../../services/cardsService";
import { gamesService } from "../../services/gamesService";
import type { Card, Game } from "../../types/models";
import Navigation from "../../components/Navigation/Navigation";
import logo from "../../assets/logo.png";
import AdminStatus from "../../components/AdminStatus/AdminStatus";
import { LoveIcon, WorkIcon, HealthIcon, MoneyIcon } from "../../components/Icons";

const CardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCardData = async () => {
      if (!id) {
        setError("ID de la carte manquant");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const cardData = await cardsService.getById(id);

        if (!cardData) {
          setError("Carte non trouvée");
          setLoading(false);
          return;
        }

        setCard(cardData);

        // Charger le jeu associé
        if (cardData.gameId) {
          const gameData = await gamesService.getById(cardData.gameId);
          setGame(gameData);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de la carte:", err);
        setError(
          err instanceof Error
            ? `Erreur: ${err.message}`
            : "Erreur lors du chargement des données. Vérifiez votre connexion et la configuration Supabase."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCardData();
  }, [id]);

  if (loading) {
    return (
      <div className="card-page">
        <div className="card-container">
          <div className="card-loading">
            <h2>Chargement de la carte...</h2>
            <p>Veuillez patienter</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="card-page">
        <div className="card-container">
          <div className="card-error">
            <h2>Erreur</h2>
            <p>{error || "Carte non trouvée"}</p>
            <Link to="/cards" className="card-back-link">
              Retour aux cartes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-page">
      <div className="card-container">
        <header className="card-header">
          <div className="card-header-left">
            <img src={logo} alt="Grimoire d'Áether" className="card-logo" />
            <h1 className="card-title">Le Grimoire d'Áether</h1>
          </div>
          <AdminStatus />
        </header>

        <Navigation />

        <div className="card-content">
          <div className="card-main">
            <div className="card-image-section">
              {card.index !== undefined && (
                <div className="card-index-large">
                  <span className="card-index-number">{card.index}</span>
                </div>
              )}
              {card.image ? (
                <div className="card-image-container">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="card-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="card-image-placeholder">
                  <span>Pas d'image</span>
                </div>
              )}
            </div>

            <div className="card-info-section">
              <div className="card-header-info">
                <h2 className="card-name">{card.name}</h2>
                {card.isFavorite && (
                  <span className="card-favorite-badge">⭐ Favori</span>
                )}
              </div>

              {game && (
                <Link to={`/game/${game.id}`} className="card-game-link">
                  <span className="card-game-label">Jeu :</span>
                  <span className="card-game-name">{game.name}</span>
                </Link>
              )}

              {card.keywords && card.keywords.length > 0 && (
                <div className="card-keywords">
                  <h3>Mots-clés</h3>
                  <div className="card-keywords-list">
                    {card.keywords.map((keyword, index) => (
                      <span key={index} className="card-keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {card.meaning && (
                <div className="card-section">
                  <h3>Signification</h3>
                  <p className="card-text">{card.meaning}</p>
                </div>
              )}

              {(card.love || card.work || card.health || card.money) && (
                <div className="card-interpretations">
                  <h3>Interprétations</h3>
                  <div className="card-interpretations-grid">
                    {card.love && (
                      <div className="card-interpretation card-interpretation-love">
                        <h4>
                          <LoveIcon size={20} className="card-interpretation-icon" />
                          <span>Amour</span>
                        </h4>
                        <p>{card.love}</p>
                      </div>
                    )}
                    {card.work && (
                      <div className="card-interpretation card-interpretation-work">
                        <h4>
                          <WorkIcon size={20} className="card-interpretation-icon" />
                          <span>Travail</span>
                        </h4>
                        <p>{card.work}</p>
                      </div>
                    )}
                    {card.health && (
                      <div className="card-interpretation card-interpretation-health">
                        <h4>
                          <HealthIcon size={20} className="card-interpretation-icon" />
                          <span>Santé</span>
                        </h4>
                        <p>{card.health}</p>
                      </div>
                    )}
                    {card.money && (
                      <div className="card-interpretation card-interpretation-money">
                        <h4>
                          <MoneyIcon size={20} className="card-interpretation-icon" />
                          <span>Argent</span>
                        </h4>
                        <p>{card.money}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {card.reversedMeaning && (
                <div className="card-section">
                  <h3>Signification inversée</h3>
                  <p className="card-text">{card.reversedMeaning}</p>
                </div>
              )}

              {card.shadowMeaning && (
                <div className="card-section">
                  <h3>Signification de l'ombre</h3>
                  <p className="card-text">{card.shadowMeaning}</p>
                </div>
              )}

              {card.advice && (
                <div className="card-section">
                  <h3>Conseil</h3>
                  <p className="card-text">{card.advice}</p>
                </div>
              )}

              {card.affirmation && (
                <div className="card-section">
                  <h3>Affirmation</h3>
                  <p className="card-affirmation">{card.affirmation}</p>
                </div>
              )}

              {(card.energies?.elements?.length ||
                card.energies?.chakras?.length) && (
                <div className="card-section">
                  <h3>Énergies</h3>
                  {card.energies.elements &&
                    card.energies.elements.length > 0 && (
                      <div className="card-energies">
                        <h4>Éléments</h4>
                        <div className="card-tags">
                          {card.energies.elements.map((element, index) => (
                            <span key={index} className="card-tag">
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  {card.energies.chakras &&
                    card.energies.chakras.length > 0 && (
                      <div className="card-energies">
                        <h4>Chakras</h4>
                        <div className="card-tags">
                          {card.energies.chakras.map((chakra, index) => (
                            <span key={index} className="card-tag">
                              {chakra}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}

              {card.symbols && card.symbols.length > 0 && (
                <div className="card-section">
                  <h3>Symboles</h3>
                  <div className="card-tags">
                    {card.symbols.map((symbol, index) => (
                      <span key={index} className="card-tag">
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
