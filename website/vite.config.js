import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone repo (AgentTavis/toploadedtreasures) headed for the custom domain
// toploadedtreasures.com at ROOT.
//
// base is RELATIVE ('./') rather than '/':
//   - '/'  works only at a true root. On the pre-domain project URL
//     (agenttavis.github.io/toploadedtreasures/) it 404s every asset and renders blank.
//   - './' resolves assets against the document, so it works at BOTH the project subfolder
//     URL (for verification now) AND the custom-domain root (later) — identical to '/' once
//     the domain is attached. Safe because the app uses HashRouter (no server-side routes).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
