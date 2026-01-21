import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
  build: {
    outDir: 'docs', // This is the magic line for GitHub
    emptyOutDir: true, // Cleans the folder before each build
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        // Add other pages here: about: resolve(__dirname, 'src/about.html')
      },
    },
  },
});