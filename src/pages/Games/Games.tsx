import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Games.css";
import { gamesService } from "../../services/gamesService";
import type { Game } from "../../types/models";
import Navigation from "../../components/Navigation/Navigation";
import logo from "../../assets/logo.png";
import AdminStatus from "../../components/AdminStatus/AdminStatus";
import Pagination from "../../components/Pagination/Pagination";

const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const gamesData = await gamesService.getAll();
        setGames(gamesData);
      } catch (err) {
        console.error("Erreur lors du chargement des jeux:", err);
        setError(
          err instanceof Error
            ? `Erreur: ${err.message}`
            : "Erreur lors du chargement des jeux. Vérifiez votre connexion et la configuration Supabase."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Pagination
  const totalPages = Math.ceil(games.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGames = useMemo(
    () => games.slice(startIndex, endIndex),
    [games, startIndex, endIndex]
  );

  // Réinitialiser la page quand les jeux changent
  useEffect(() => {
    setCurrentPage(1);
  }, [games.length]);

  if (loading) {
    return (
      <div className="games-page">
        <div className="games-container">
          <div className="games-loading">
            <h2>Chargement des jeux...</h2>
            <p>Veuillez patienter</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-page">
        <div className="games-container">
          <div className="games-error">
            <h2>Erreur</h2>
            <p>{error}</p>
            <Link to="/" className="games-back-link">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="games-page">
      <div className="games-container">
        <header className="games-header">
          <div className="games-header-left">
            <img src={logo} alt="Grimoire d'Áether" className="games-logo" />
            <h1 className="games-title">Le Grimoire d'Áether</h1>
          </div>
          <AdminStatus />
        </header>

        <Navigation />

        <div className="games-content">
          <h2 className="games-page-title">Tous les Jeux</h2>
          {games.length === 0 ? (
            <p className="games-empty">Aucun jeu disponible pour le moment.</p>
          ) : (
            <>
              <div className="games-grid">
                {paginatedGames.map((game) => (
                <Link
                  key={game.id}
                  to={`/game/${game.id}`}
                  className="games-item"
                >
                  {game.coverImage && (
                    <div className="games-item-image">
                      <img
                        src={game.coverImage}
                        alt={game.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="games-item-content">
                    <h3 className="games-item-name">{game.name}</h3>
                    <p className="games-item-type">{game.type}</p>
                    {game.author && (
                      <p className="games-item-author">par {game.author}</p>
                    )}
                    {game.year && (
                      <p className="games-item-year">{game.year}</p>
                    )}
                    {game.cardCount && (
                      <p className="games-item-count">
                        {game.cardCount} carte{game.cardCount > 1 ? "s" : ""}
                      </p>
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

export default Games;

