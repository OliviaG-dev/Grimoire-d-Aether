import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer React et React DOM dans un chunk dédié
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Séparer Clerk dans un chunk dédié
          'clerk': ['@clerk/clerk-react'],
          // Séparer Supabase dans un chunk dédié
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Augmenter la limite d'avertissement à 600 kB (les chunks vendor peuvent être plus gros)
    chunkSizeWarningLimit: 600,
  },
})
