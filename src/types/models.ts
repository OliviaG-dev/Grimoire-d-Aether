/**
 * Types pour les modèles utilisés dans l'application (camelCase)
 */

export interface Game {
  id: string;
  name: string;
  type: string;
  author: string;
  year: string;
  theme: string;
  coverImage?: string;
  description: string;
  cardCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Card {
  id: string;
  gameId: string;
  name: string;
  image?: string;
  keywords?: string[];
  meaning?: string;
  love?: string;
  work?: string;
  health?: string;
  money?: string;
  energies?: {
    elements?: string[];
    chakras?: string[];
  };
  symbols?: string[];
  index?: number;
  shadowMeaning?: string;
  advice?: string;
  affirmation?: string;
  reversedMeaning?: string;
  isFavorite?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

