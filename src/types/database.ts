/**
 * Types pour les données telles qu'elles sont stockées dans Supabase (snake_case)
 */

export interface GameRow {
  id: string;
  name: string;
  type: string;
  author: string;
  year: string;
  theme: string;
  cover_image: string | null;
  description: string;
  card_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface CardRow {
  id: string;
  game_id: string;
  name: string;
  image: string | null;
  keywords: string[] | null;
  meaning: string | null;
  love: string | null;
  work: string | null;
  health: string | null;
  money: string | null;
  elements: string[] | null;
  chakras: string[] | null;
  symbols: string[] | null;
  created_at: string;
  updated_at: string;
}

/**
 * Types pour les insertions/mises à jour (sans les champs auto-générés)
 */
export interface GameInsert {
  name: string;
  type: string;
  author: string;
  year: string;
  theme: string;
  cover_image?: string | null;
  description: string;
  card_count?: number | null;
}

export interface GameUpdate {
  name?: string;
  type?: string;
  author?: string;
  year?: string;
  theme?: string;
  cover_image?: string | null;
  description?: string;
  card_count?: number | null;
  updated_at?: string;
}

export interface CardInsert {
  game_id: string;
  name: string;
  image?: string | null;
  keywords?: string[] | null;
  meaning?: string | null;
  love?: string | null;
  work?: string | null;
  health?: string | null;
  money?: string | null;
  elements?: string[] | null;
  chakras?: string[] | null;
  symbols?: string[] | null;
}

export interface CardUpdate {
  game_id?: string;
  name?: string;
  image?: string | null;
  keywords?: string[] | null;
  meaning?: string | null;
  love?: string | null;
  work?: string | null;
  health?: string | null;
  money?: string | null;
  elements?: string[] | null;
  chakras?: string[] | null;
  symbols?: string[] | null;
  updated_at?: string;
}

