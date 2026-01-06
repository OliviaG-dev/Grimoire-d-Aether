import { supabase } from "../config/supabase";

/**
 * Service pour gérer l'upload d'images vers Supabase Storage
 */
export const imageService = {
  /**
   * Upload une image vers Supabase Storage
   * @param file Le fichier à uploader
   * @param folder Le dossier de destination (par défaut: 'cards')
   * @returns L'URL publique de l'image uploadée
   */
  async uploadImage(file: File, folder: string = "cards"): Promise<string> {
    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload du fichier vers Supabase Storage
      const { data: uploadData, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        // Message d'erreur explicite pour le bucket manquant
        if (
          error.message.includes("Bucket not found") ||
          error.message.includes("not found")
        ) {
          throw new Error(
            "Le bucket 'images' n'existe pas dans Supabase Storage. " +
              "Veuillez créer un bucket nommé 'images' dans votre projet Supabase " +
              "(Storage > New bucket) et le configurer en mode public."
          );
        }

        throw new Error(`Impossible d'uploader l'image: ${error.message}`);
      }

      // Vérifier que l'upload a réussi
      if (!uploadData) {
        throw new Error("L'upload a échoué : aucune donnée retournée");
      }

      // Récupérer l'URL publique - utiliser le chemin exact retourné par l'upload
      const actualPath = uploadData.path || filePath;

      // Normaliser le chemin (enlever les slashes en double)
      const normalizedPath = actualPath
        .replace(/^\/+|\/+$/g, "")
        .replace(/\/+/g, "/");

      // Obtenir l'URL publique via getPublicUrl
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(normalizedPath);

      if (!urlData?.publicUrl) {
        // Si getPublicUrl ne fonctionne pas, construire l'URL manuellement
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl) {
          throw new Error(
            "VITE_SUPABASE_URL n'est pas défini dans les variables d'environnement"
          );
        }
        return `${supabaseUrl}/storage/v1/object/public/images/${normalizedPath}`;
      }

      return urlData.publicUrl;
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image:", err);
      throw err instanceof Error
        ? err
        : new Error("Une erreur est survenue lors de l'upload de l'image");
    }
  },

  /**
   * Lister les fichiers dans le bucket (pour débogage)
   * @param folder Le dossier à lister (optionnel)
   */
  async listFiles(folder: string = "cards"): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error("Erreur lors de la liste des fichiers:", error);
        throw new Error(`Impossible de lister les fichiers: ${error.message}`);
      }

      return data?.map((file) => `${folder}/${file.name}`) || [];
    } catch (err) {
      console.error("Erreur lors de la liste des fichiers:", err);
      throw err instanceof Error
        ? err
        : new Error("Une erreur est survenue lors de la liste des fichiers");
    }
  },

  /**
   * Supprimer une image de Supabase Storage
   * @param imageUrl L'URL de l'image à supprimer
   */
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extraire le chemin du fichier depuis l'URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split("/");
      const bucketIndex = pathParts.findIndex((part) => part === "images");

      if (bucketIndex === -1) {
        throw new Error("URL d'image invalide");
      }

      const filePath = pathParts.slice(bucketIndex + 1).join("/");

      const { error } = await supabase.storage
        .from("images")
        .remove([filePath]);

      if (error) {
        console.error("Erreur lors de la suppression:", error);
        throw new Error(`Impossible de supprimer l'image: ${error.message}`);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'image:", err);
      throw err instanceof Error
        ? err
        : new Error(
            "Une erreur est survenue lors de la suppression de l'image"
          );
    }
  },
};
