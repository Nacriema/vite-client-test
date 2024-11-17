import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// Load environment variables
dotenv.config();

// Create equivalent of __dirname in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // General configuration for development and production
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'node_modules/onnxruntime-web/dist/*.wasm',
    //       dest: '',
    //     }
    //   ],
    //   hook: 'buildStart',
    // }),
  ],

  // // 
  // base: '/',

  // // Server configuration (development mode)
  // server: {
  //   open: true, // Open browser automatically in dev mode
  //   headers: {
  //     'Cross-Origin-Opener-Policy': 'same-origin',
  //     'Cross-Origin-Embedder-Policy': 'credentialless',
  //   },
  //   hmr: true, // Enable Hot Module Replacement
  //   mimeTypes: {
  //     'application/wasm': ['wasm'], // Add this line to set the correct MIME type for WASM files
  //     'application/octet-stream': ['npy'],
  //   },
  // },

  // // Build configuration (production mode)
  // build: {
  //   outDir: 'dist', // Output directory
  //   assetsDir: 'js', // Directory for static assets (JS, CSS)
  //   sourcemap: true, // Enable source maps in production
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'), // Cập nhật đường dẫn entry point
  //     },
  //     output: {
  //       entryFileNames: 'js/bundle.[hash].min.js', // File naming pattern with hash for cache busting
  //       manualChunks: {
  //         vendor: ['react', 'react-dom', 'three']
  //       }
  //     },
  //     external: ['axios'],
  //   },
  //   chunkSizeWarningLimit: 1000
  // },

  // // Resolve file extensions and paths
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, './src'), // Cập nhật alias
  //   },
  //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
  // },
  // define: {
  //   'process.env': {}, // Tạo biến global "process.env" nếu cần
  // },
});