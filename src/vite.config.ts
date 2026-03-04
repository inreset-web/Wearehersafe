import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  // Detectar si existe src/public o public en la raíz
  publicDir: (() => {
    const srcPublic = path.resolve(__dirname, 'src/public');
    const rootPublic = path.resolve(__dirname, 'public');
    
    // Priorizar src/public si existe
    if (fs.existsSync(srcPublic)) {
      console.log('📁 Usando src/public como carpeta pública');
      return srcPublic;
    }
    
    console.log('📁 Usando public como carpeta pública');
    return rootPublic;
  })(),
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
});