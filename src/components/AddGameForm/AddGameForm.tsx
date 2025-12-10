import React, { useState } from "react";
import { gamesService } from "../../services/gamesService";
import type { Game } from "../../types/models";
import "./AddGameForm.css";

interface AddGameFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddGameForm: React.FC<AddGameFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Game, "id" | "createdAt" | "updatedAt">>({
    name: "",
    type: "",
    author: "",
    year: "",
    theme: "",
    coverImage: "",
    description: "",
    cardCount: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.name.trim()) {
        throw new Error("Le nom est requis");
      }
      if (!formData.type.trim()) {
        throw new Error("Le type est requis");
      }
      if (!formData.author.trim()) {
        throw new Error("L'auteur est requis");
      }
      if (!formData.year.trim()) {
        throw new Error("L'année est requise");
      }
      if (!formData.theme.trim()) {
        throw new Error("Le thème est requis");
      }
      if (!formData.description.trim()) {
        throw new Error("La description est requise");
      }

      await gamesService.create({
        ...formData,
        coverImage: formData.coverImage || undefined,
        cardCount: formData.cardCount || undefined,
      });

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-game-form-overlay">
      <div className="add-game-form-container">
        <div className="add-game-form-header">
          <h2>Ajouter un jeu</h2>
          <button
            type="button"
            className="add-game-form-close"
            onClick={onCancel}
            aria-label="Fermer"
          />
        </div>

        <form onSubmit={handleSubmit} className="add-game-form">
          {error && <div className="add-game-form-error">{error}</div>}

          <div className="add-game-form-group">
            <label htmlFor="name">Nom *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nom du jeu"
            />
          </div>

          <div className="add-game-form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un type</option>
              <option value="Tarot">Tarot</option>
              <option value="Oracle">Oracle</option>
              <option value="Lenormand">Lenormand</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="add-game-form-row">
            <div className="add-game-form-group">
              <label htmlFor="author">Auteur *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Nom de l'auteur"
              />
            </div>

            <div className="add-game-form-group">
              <label htmlFor="year">Année *</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                placeholder="Ex: 2024"
              />
            </div>
          </div>

          <div className="add-game-form-row">
            <div className="add-game-form-group">
              <label htmlFor="theme">Thème *</label>
              <input
                type="text"
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                required
                placeholder="Thème du jeu"
              />
            </div>

            <div className="add-game-form-group">
              <label htmlFor="cardCount">Nombre de cartes</label>
              <input
                type="number"
                id="cardCount"
                name="cardCount"
                value={formData.cardCount || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    cardCount: value === "" ? undefined : parseInt(value, 10),
                  }));
                  setError(null);
                }}
                min="0"
                placeholder="Ex: 78"
              />
            </div>
          </div>

          <div className="add-game-form-group">
            <label htmlFor="coverImage">Image de couverture (URL)</label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://exemple.com/image.jpg"
            />
          </div>

          <div className="add-game-form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Description du jeu"
            />
          </div>

          <div className="add-game-form-actions">
            <button
              type="button"
              className="add-game-form-cancel"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="add-game-form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer le jeu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGameForm;

