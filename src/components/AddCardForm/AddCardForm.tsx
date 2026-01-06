import React, { useState, useEffect } from "react";
import { cardsService } from "../../services/cardsService";
import { gamesService } from "../../services/gamesService";
import { imageService } from "../../services/imageService";
import type { Card, Game } from "../../types/models";
import "./AddCardForm.css";

interface AddCardFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  card?: Card; // Si fourni, on est en mode édition
}

const AddCardForm: React.FC<AddCardFormProps> = ({
  onSuccess,
  onCancel,
  card,
}) => {
  const isEditMode = !!card;
  const [games, setGames] = useState<Game[]>([]);
  const [formData, setFormData] = useState<
    Omit<Card, "id" | "createdAt" | "updatedAt">
  >({
    gameId: card?.gameId || "",
    name: card?.name || "",
    image: card?.image || "",
    keywords: card?.keywords || [],
    meaning: card?.meaning || "",
    love: card?.love || "",
    work: card?.work || "",
    health: card?.health || "",
    money: card?.money || "",
    energies: {
      elements: card?.energies?.elements || [],
      chakras: card?.energies?.chakras || [],
    },
    symbols: card?.symbols || [],
    index: card?.index || undefined,
    shadowMeaning: card?.shadowMeaning || "",
    advice: card?.advice || "",
    affirmation: card?.affirmation || "",
    reversedMeaning: card?.reversedMeaning || "",
    isFavorite: card?.isFavorite || false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingGames, setLoadingGames] = useState(true);
  const [imageInputType, setImageInputType] = useState<"url" | "file">("url");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Charger les jeux au montage
  useEffect(() => {
    const loadGames = async () => {
      try {
        const loadedGames = await gamesService.getAll();
        setGames(loadedGames);
      } catch {
        setError("Impossible de charger les jeux");
      } finally {
        setLoadingGames(false);
      }
    };
    loadGames();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        setError("Veuillez sélectionner un fichier image valide");
        return;
      }
      // Vérifier la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 10MB");
        return;
      }
      setImageFile(file);
      setError(null);
      // Créer une preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageInputTypeChange = (type: "url" | "file") => {
    setImageInputType(type);
    if (type === "url") {
      setImageFile(null);
      setImagePreview(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
    setError(null);
  };

  const handleArrayChange = (
    field: "keywords" | "symbols" | "elements" | "chakras",
    value: string
  ) => {
    const array = value
      .split(";")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData((prev) => {
      if (field === "elements" || field === "chakras") {
        return {
          ...prev,
          energies: {
            ...prev.energies,
            [field]: array,
          },
        };
      }
      return {
        ...prev,
        [field]: array,
      };
    });
    setError(null);
  };

  const getArrayValue = (
    field: "keywords" | "symbols" | "elements" | "chakras"
  ): string => {
    if (field === "elements" || field === "chakras") {
      return formData.energies?.[field]?.join("; ") || "";
    }
    return formData[field]?.join("; ") || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setUploadingImage(false);

    try {
      // Validation
      if (!formData.gameId.trim()) {
        throw new Error("Le jeu est requis");
      }
      if (!formData.name.trim()) {
        throw new Error("Le nom est requis");
      }

      // Upload de l'image si un fichier est sélectionné
      let imageUrl = formData.image;
      if (imageInputType === "file" && imageFile) {
        setUploadingImage(true);
        try {
          imageUrl = await imageService.uploadImage(imageFile, "cards");
        } catch (uploadError) {
          throw new Error(
            uploadError instanceof Error
              ? uploadError.message
              : "Erreur lors de l'upload de l'image"
          );
        } finally {
          setUploadingImage(false);
        }
      }

      const cardData = {
        ...formData,
        image: imageUrl || undefined,
        keywords:
          formData.keywords && formData.keywords.length > 0
            ? formData.keywords
            : undefined,
        meaning: formData.meaning || undefined,
        love: formData.love || undefined,
        work: formData.work || undefined,
        health: formData.health || undefined,
        money: formData.money || undefined,
        energies: {
          elements:
            formData.energies?.elements && formData.energies.elements.length > 0
              ? formData.energies.elements
              : undefined,
          chakras:
            formData.energies?.chakras && formData.energies.chakras.length > 0
              ? formData.energies.chakras
              : undefined,
        },
        symbols:
          formData.symbols && formData.symbols.length > 0
            ? formData.symbols
            : undefined,
        index: formData.index || undefined,
        shadowMeaning: formData.shadowMeaning || undefined,
        advice: formData.advice || undefined,
        affirmation: formData.affirmation || undefined,
        reversedMeaning: formData.reversedMeaning || undefined,
        isFavorite: formData.isFavorite,
      };

      if (isEditMode && card) {
        await cardsService.update(card.id, cardData);
      } else {
        await cardsService.create(cardData);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-card-form-overlay">
      <div className="add-card-form-container">
        <div className="add-card-form-header">
          <h2>{isEditMode ? "Modifier la carte" : "Ajouter une carte"}</h2>
          <button
            type="button"
            className="add-card-form-close"
            onClick={onCancel}
            aria-label="Fermer"
          />
        </div>

        <form onSubmit={handleSubmit} className="add-card-form">
          {error && <div className="add-card-form-error">{error}</div>}

          <div className="add-card-form-group">
            <label htmlFor="gameId">Jeu *</label>
            {loadingGames ? (
              <div className="add-card-form-loading">
                Chargement des jeux...
              </div>
            ) : (
              <select
                id="gameId"
                name="gameId"
                value={formData.gameId}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un jeu</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="add-card-form-group">
            <label htmlFor="name">Nom *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nom de la carte"
            />
          </div>

          <div className="add-card-form-group">
            <label>Image</label>
            <div className="add-card-form-image-options">
              <button
                type="button"
                className={`add-card-form-image-option ${
                  imageInputType === "url" ? "active" : ""
                }`}
                onClick={() => handleImageInputTypeChange("url")}
              >
                URL
              </button>
              <button
                type="button"
                className={`add-card-form-image-option ${
                  imageInputType === "file" ? "active" : ""
                }`}
                onClick={() => handleImageInputTypeChange("file")}
              >
                Fichier
              </button>
            </div>
            {imageInputType === "url" ? (
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://exemple.com/image.jpg"
              />
            ) : (
              <div className="add-card-form-file-upload">
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="add-card-form-file-input"
                />
                <label htmlFor="imageFile" className="add-card-form-file-label">
                  {imageFile
                    ? imageFile.name
                    : "Cliquez pour sélectionner une image"}
                </label>
                {imagePreview && (
                  <div className="add-card-form-image-preview">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="add-card-form-preview-img"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="add-card-form-group">
            <label htmlFor="keywords">
              Mots-clés (séparés par des points-virgules)
            </label>
            <input
              type="text"
              id="keywords"
              value={getArrayValue("keywords")}
              onChange={(e) => handleArrayChange("keywords", e.target.value)}
              placeholder="mot1; mot2; mot3"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="meaning">Signification</label>
            <textarea
              id="meaning"
              name="meaning"
              value={formData.meaning}
              onChange={handleChange}
              rows={4}
              placeholder="Signification de la carte"
            />
          </div>

          <div className="add-card-form-row">
            <div className="add-card-form-group">
              <label htmlFor="love">Amour</label>
              <textarea
                id="love"
                name="love"
                value={formData.love}
                onChange={handleChange}
                rows={3}
                placeholder="Interprétation amour"
              />
            </div>

            <div className="add-card-form-group">
              <label htmlFor="work">Travail</label>
              <textarea
                id="work"
                name="work"
                value={formData.work}
                onChange={handleChange}
                rows={3}
                placeholder="Interprétation travail"
              />
            </div>
          </div>

          <div className="add-card-form-row">
            <div className="add-card-form-group">
              <label htmlFor="health">Santé</label>
              <textarea
                id="health"
                name="health"
                value={formData.health}
                onChange={handleChange}
                rows={3}
                placeholder="Interprétation santé"
              />
            </div>

            <div className="add-card-form-group">
              <label htmlFor="money">Argent</label>
              <textarea
                id="money"
                name="money"
                value={formData.money}
                onChange={handleChange}
                rows={3}
                placeholder="Interprétation argent"
              />
            </div>
          </div>

          <div className="add-card-form-group">
            <label htmlFor="elements">
              Éléments (séparés par des points-virgules)
            </label>
            <input
              type="text"
              id="elements"
              value={getArrayValue("elements")}
              onChange={(e) => handleArrayChange("elements", e.target.value)}
              placeholder="Terre; Feu; Eau; Air"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="chakras">
              Chakras (séparés par des points-virgules)
            </label>
            <input
              type="text"
              id="chakras"
              value={getArrayValue("chakras")}
              onChange={(e) => handleArrayChange("chakras", e.target.value)}
              placeholder="Racine; Coeur; Couronne"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="symbols">
              Symboles (séparés par des points-virgules)
            </label>
            <input
              type="text"
              id="symbols"
              value={getArrayValue("symbols")}
              onChange={(e) => handleArrayChange("symbols", e.target.value)}
              placeholder="symbole1; symbole2; symbole3"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="index">Index</label>
            <input
              type="number"
              id="index"
              name="index"
              value={formData.index || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  index: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                }))
              }
              placeholder="Numéro d'index de la carte"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="shadowMeaning">Signification de l'ombre</label>
            <textarea
              id="shadowMeaning"
              name="shadowMeaning"
              value={formData.shadowMeaning}
              onChange={handleChange}
              rows={3}
              placeholder="Signification de l'ombre de la carte"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="advice">Conseil</label>
            <textarea
              id="advice"
              name="advice"
              value={formData.advice}
              onChange={handleChange}
              rows={3}
              placeholder="Conseil associé à la carte"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="affirmation">Affirmation</label>
            <textarea
              id="affirmation"
              name="affirmation"
              value={formData.affirmation}
              onChange={handleChange}
              rows={3}
              placeholder="Affirmation positive de la carte"
            />
          </div>

          <div className="add-card-form-group">
            <label htmlFor="reversedMeaning">Signification inversée</label>
            <textarea
              id="reversedMeaning"
              name="reversedMeaning"
              value={formData.reversedMeaning}
              onChange={handleChange}
              rows={3}
              placeholder="Signification lorsque la carte est inversée"
            />
          </div>

          <div className="add-card-form-group">
            <label
              htmlFor="isFavorite"
              className="add-card-form-checkbox-label"
            >
              <input
                type="checkbox"
                id="isFavorite"
                name="isFavorite"
                checked={formData.isFavorite || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFavorite: e.target.checked,
                  }))
                }
              />
              <span>Marquer comme favori</span>
            </label>
          </div>

          <div className="add-card-form-actions">
            <button
              type="button"
              className="add-card-form-cancel"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="add-card-form-submit"
              disabled={isSubmitting || uploadingImage}
            >
              {uploadingImage
                ? "Upload de l'image..."
                : isSubmitting
                ? isEditMode
                  ? "Modification..."
                  : "Création..."
                : isEditMode
                ? "Modifier la carte"
                : "Créer la carte"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;
