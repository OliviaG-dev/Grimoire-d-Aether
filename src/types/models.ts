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
  energies?: {
    elements?: string[];
    chakras?: string[];
  };
  symbols?: string[];
  createdAt?: string;
  updatedAt?: string;
}

