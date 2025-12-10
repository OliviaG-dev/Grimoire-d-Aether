import { supabase } from "../config/supabase";
import type { GameRow, GameInsert, GameUpdate } from "../types/database";
import type { Game } from "../types/models";

/**
 * Convertir une ligne de base de données (snake_case) en modèle d'application (camelCase)
 */
function rowToGame(row: GameRow): Game {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    author: row.author,
    year: row.year,
    theme: row.theme,
    coverImage: row.cover_image || undefined,
    description: row.description,
    cardCount: row.card_count || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Convertir un modèle d'application (camelCase) en format d'insertion (snake_case)
 */
function gameToInsert(
  game: Omit<Game, "id" | "createdAt" | "updatedAt">
): GameInsert {
  return {
    name: game.name,
    type: game.type,
    author: game.author,
    year: game.year,
    theme: game.theme,
    cover_image: game.coverImage || null,
    description: game.description,
    card_count: game.cardCount || null,
  };
}

/**
 * Service pour gérer les jeux dans Supabase
 */
export const gamesService = {
  /**
   * Récupérer tous les jeux
   */
  async getAll(): Promise<Game[]> {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Erreur lors de la récupération des jeux:", error);
      throw new Error(`Impossible de récupérer les jeux: ${error.message}`);
    }

    return (data as GameRow[]).map(rowToGame);
  },

  /**
   * Récupérer un jeu par son ID
   */
  async getById(id: string): Promise<Game | null> {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Aucun résultat trouvé
        return null;
      }
      console.error("Erreur lors de la récupération du jeu:", error);
      throw new Error(`Impossible de récupérer le jeu: ${error.message}`);
    }

    return rowToGame(data as GameRow);
  },

  /**
   * Créer un nouveau jeu
   */
  async create(
    game: Omit<Game, "id" | "createdAt" | "updatedAt">
  ): Promise<Game> {
    const insertData = gameToInsert(game);

    const { data, error } = await supabase
      .from("games")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la création du jeu:", error);
      throw new Error(`Impossible de créer le jeu: ${error.message}`);
    }

    return rowToGame(data as GameRow);
  },

  /**
   * Mettre à jour un jeu
   */
  async update(id: string, updates: Partial<Game>): Promise<Game> {
    const updateData: GameUpdate = {};

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.type !== undefined) updateData.type = updates.type;
    if (updates.author !== undefined) updateData.author = updates.author;
    if (updates.year !== undefined) updateData.year = updates.year;
    if (updates.theme !== undefined) updateData.theme = updates.theme;
    if (updates.coverImage !== undefined)
      updateData.cover_image = updates.coverImage || null;
    if (updates.description !== undefined)
      updateData.description = updates.description;
    if (updates.cardCount !== undefined)
      updateData.card_count = updates.cardCount || null;

    // Mettre à jour updated_at
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("games")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la mise à jour du jeu:", error);
      throw new Error(`Impossible de mettre à jour le jeu: ${error.message}`);
    }

    return rowToGame(data as GameRow);
  },

  /**
   * Supprimer un jeu
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("games").delete().eq("id", id);

    if (error) {
      console.error("Erreur lors de la suppression du jeu:", error);
      throw new Error(`Impossible de supprimer le jeu: ${error.message}`);
    }
  },
};
