import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { start } from 'repl';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
    }),
  ],
  logLevel: 'info', // Options: 'info' | 'warn' | 'error' | 'silent'
  clearScreen: false, // Prevents Vite from clearing the terminal so you can read full stack traces
  // ... rest of your config,
  build: {
    outDir: 'docs', // This is the magic line for GitHub
    emptyOutDir: true, // Cleans the folder before each build
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        americana: resolve(__dirname, 'americana.html'),
        analysis: resolve(__dirname, 'analysis.html'),
        bakery: resolve(__dirname, 'bakery.html'),
        c3: resolve(__dirname, 'c3.html'),
        cookbook: resolve(__dirname, 'cookbook.html'),
        decade: resolve(__dirname, 'decade.html'),
        duck: resolve(__dirname, 'duck.html'),
        lostandfound: resolve(__dirname, 'lost-and-found.html'),
        muff: resolve(__dirname, 'muff.html'),
        star: resolve(__dirname, 'star.html'),
        litter: resolve(__dirname, 'litter.html'),
        recipemotion: resolve(__dirname, 'recipes-motion.html'),
        heart: resolve(__dirname, 'heart.html'),
        // Add other pages here: about: resolve(__dirname, 'src/about.html')
      },
      output: {
        // This keeps your JS inside a /js folder in /docs
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    },
  },
});