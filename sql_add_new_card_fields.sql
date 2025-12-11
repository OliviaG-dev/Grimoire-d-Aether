-- Ajouter les nouveaux champs à la table cards
ALTER TABLE cards
ADD COLUMN IF NOT EXISTS index INTEGER,
ADD COLUMN IF NOT EXISTS shadow_meaning TEXT,
ADD COLUMN IF NOT EXISTS advice TEXT,
ADD COLUMN IF NOT EXISTS affirmation TEXT,
ADD COLUMN IF NOT EXISTS reversed_meaning TEXT,
ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT false;


