import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Cards.css";
import { cardsService } from "../../services/cardsService";
import { gamesService } from "../../services/gamesService";
import type { Card, Game } from "../../types/models";
import Navigation from "../../components/Navigation/Navigation";
import logo from "../../assets/logo.png";
import AdminStatus from "../../components/AdminStatus/AdminStatus";
import Pagination from "../../components/Pagination/Pagination";

const Cards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGameId, setSelectedGameId] = useState<string>("");
  const [filterIndex, setFilterIndex] = useState<string>("");
  const [filterFavorite, setFilterFavorite] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [cardsData, gamesData] = await Promise.all([
          cardsService.getAll(),
          gamesService.getAll(),
        ]);
        setCards(cardsData);
        setGames(gamesData);
      } catch (err) {
        console.error("Erreur lors du chargement des cartes:", err);
        setError(
          err instanceof Error
            ? `Erreur: ${err.message}`
            : "Erreur lors du chargement des cartes. Vérifiez votre connexion et la configuration Supabase."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrer les cartes selon la recherche, le jeu et l'index sélectionnés
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        searchQuery === "" ||
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesGame =
        selectedGameId === "" || card.gameId === selectedGameId;
      const matchesIndex =
        filterIndex.trim() === "" ||
        String(card.index ?? "").toLowerCase() ===
          filterIndex.trim().toLowerCase();
      const matchesFavorite = !filterFavorite || card.isFavorite === true;
      return matchesSearch && matchesGame && matchesIndex && matchesFavorite;
    });
  }, [cards, searchQuery, selectedGameId, filterIndex, filterFavorite]);

  // Pagination
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCards = filteredCards.slice(startIndex, endIndex);

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGameId, filterIndex, filterFavorite]);

  // Créer un map pour accéder rapidement au nom du jeu
  const gameMap = useMemo(() => {
    const map = new Map<string, string>();
    games.forEach((game) => {
      map.set(game.id, game.name);
    });
    return map;
  }, [games]);

  if (loading) {
    return (
      <div className="cards-page">
        <div className="cards-container">
          <div className="cards-loading">
            <h2>Chargement des cartes...</h2>
            <p>Veuillez patienter</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cards-page">
        <div className="cards-container">
          <div className="cards-error">
            <h2>Erreur</h2>
            <p>{error}</p>
            <Link to="/" className="cards-back-link">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cards-page">
      <div className="cards-container">
        <header className="cards-header">
          <div className="cards-header-left">
            <img src={logo} alt="Grimoire d'Áether" className="cards-logo" />
            <h1 className="cards-title">Le Grimoire d'Áether</h1>
          </div>
          <AdminStatus />
        </header>

        <Navigation />

        <div className="cards-content">
          <h2 className="cards-page-title">Toutes les Cartes</h2>

          <div className="cards-filters">
            <div className="cards-search">
              <input
                type="text"
                placeholder="Rechercher une carte ou un mot-clé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cards-search-input"
              />
            </div>
            <div className="cards-game-filter">
              <select
                value={selectedGameId}
                onChange={(e) => setSelectedGameId(e.target.value)}
                className="cards-game-select"
              >
                <option value="">Tous les jeux</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="cards-index-filter">
              <input
                type="number"
                inputMode="numeric"
                value={filterIndex}
                onChange={(e) => setFilterIndex(e.target.value)}
                placeholder="Index (ex: 12)"
                className="cards-index-input"
              />
            </div>
            <div className="cards-favorite-filter">
              <label className="cards-favorite-checkbox-label">
                <input
                  type="checkbox"
                  checked={filterFavorite}
                  onChange={(e) => setFilterFavorite(e.target.checked)}
                  className="cards-favorite-checkbox"
                />
                <span className="cards-favorite-toggle"></span>
                <span className="cards-favorite-text">⭐ Favoris</span>
              </label>
            </div>
          </div>

          <div className="cards-count">
            {filteredCards.length === 0 ? (
              <p className="cards-empty">
                {searchQuery || selectedGameId || filterIndex || filterFavorite
                  ? "Aucune carte ne correspond à votre recherche."
                  : "Aucune carte disponible pour le moment."}
              </p>
            ) : (
              <p className="cards-count-text">
                {filteredCards.length} carte
                {filteredCards.length > 1 ? "s" : ""}{" "}
                {searchQuery || selectedGameId || filterIndex || filterFavorite
                  ? "trouvée(s)"
                  : "disponible(s)"}
              </p>
            )}
          </div>

          {filteredCards.length > 0 && (
            <>
              <div className="cards-grid">
                {paginatedCards.map((card) => (
                <Link
                  key={card.id}
                  to={`/card/${card.id}`}
                  className="cards-item"
                >
                  {card.index !== undefined && card.index !== null && (
                    <div className="cards-item-index">{card.index}</div>
                  )}
                  {card.image && (
                    <div className="cards-item-image">
                      <img
                        src={card.image}
                        alt={card.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="cards-item-content">
                    <h3 className="cards-item-name">{card.name}</h3>
                    {gameMap.get(card.gameId) && (
                      <p className="cards-item-game">
                        {gameMap.get(card.gameId)}
                      </p>
                    )}
                    {card.keywords && card.keywords.length > 0 && (
                      <p className="cards-item-keywords">
                        {card.keywords.slice(0, 3).join(", ")}
                        {card.keywords.length > 3 && "..."}
                      </p>
                    )}
                    {card.isFavorite && (
                      <span className="cards-item-favorite">⭐ Favori</span>
                    )}
                  </div>
                </Link>
              ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
