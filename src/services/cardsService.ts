import { supabase } from '../config/supabase';
import type { CardRow, CardInsert, CardUpdate } from '../types/database';
import type { Card } from '../types/models';

/**
 * Convertir une ligne de base de données (snake_case) en modèle d'application (camelCase)
 */
function rowToCard(row: CardRow): Card {
  return {
    id: row.id,
    gameId: row.game_id,
    name: row.name,
    image: row.image || undefined,
    keywords: row.keywords || undefined,
    meaning: row.meaning || undefined,
    love: row.love || undefined,
    work: row.work || undefined,
    health: row.health || undefined,
    money: row.money || undefined,
    energies: {
      elements: row.elements || undefined,
      chakras: row.chakras || undefined,
    },
    symbols: row.symbols || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Convertir un modèle d'application (camelCase) en format d'insertion (snake_case)
 */
function cardToInsert(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): CardInsert {
  return {
    game_id: card.gameId,
    name: card.name,
    image: card.image || null,
    keywords: card.keywords || null,
    meaning: card.meaning || null,
    love: card.love || null,
    work: card.work || null,
    health: card.health || null,
    money: card.money || null,
    elements: card.energies?.elements || null,
    chakras: card.energies?.chakras || null,
    symbols: card.symbols || null,
  };
}

/**
 * Service pour gérer les cartes dans Supabase
 */
export const cardsService = {
  /**
   * Récupérer toutes les cartes
   */
  async getAll(): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
      throw new Error(`Impossible de récupérer les cartes: ${error.message}`);
    }

    return (data as CardRow[]).map(rowToCard);
  },

  /**
   * Récupérer toutes les cartes d'un jeu spécifique
   */
  async getByGameId(gameId: string): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('game_id', gameId)
      .order('name', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
      throw new Error(`Impossible de récupérer les cartes: ${error.message}`);
    }

    return (data as CardRow[]).map(rowToCard);
  },

  /**
   * Récupérer une carte par son ID
   */
  async getById(id: string): Promise<Card | null> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Aucun résultat trouvé
        return null;
      }
      console.error('Erreur lors de la récupération de la carte:', error);
      throw new Error(`Impossible de récupérer la carte: ${error.message}`);
    }

    return rowToCard(data as CardRow);
  },

  /**
   * Créer une nouvelle carte
   */
  async create(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
    const insertData = cardToInsert(card);

    const { data, error } = await supabase
      .from('cards')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la création de la carte:', error);
      throw new Error(`Impossible de créer la carte: ${error.message}`);
    }

    return rowToCard(data as CardRow);
  },

  /**
   * Mettre à jour une carte
   */
  async update(id: string, updates: Partial<Card>): Promise<Card> {
    const updateData: CardUpdate = {};

    if (updates.gameId !== undefined) updateData.game_id = updates.gameId;
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.image !== undefined) updateData.image = updates.image || null;
    if (updates.keywords !== undefined) updateData.keywords = updates.keywords || null;
    if (updates.meaning !== undefined) updateData.meaning = updates.meaning || null;
    if (updates.love !== undefined) updateData.love = updates.love || null;
    if (updates.work !== undefined) updateData.work = updates.work || null;
    if (updates.health !== undefined) updateData.health = updates.health || null;
    if (updates.money !== undefined) updateData.money = updates.money || null;
    if (updates.energies?.elements !== undefined) updateData.elements = updates.energies.elements || null;
    if (updates.energies?.chakras !== undefined) updateData.chakras = updates.energies.chakras || null;
    if (updates.symbols !== undefined) updateData.symbols = updates.symbols || null;

    // Mettre à jour updated_at
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('cards')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la mise à jour de la carte:', error);
      throw new Error(`Impossible de mettre à jour la carte: ${error.message}`);
    }

    return rowToCard(data as CardRow);
  },

  /**
   * Supprimer une carte
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression de la carte:', error);
      throw new Error(`Impossible de supprimer la carte: ${error.message}`);
    }
  },
};

