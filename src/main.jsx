/**
 * main.jsx — Titik masuk (entry point) aplikasi React
 * Fungsi: menghubungkan DOM (#root) ke komponen React dan memuat gaya global.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot: API React 18 untuk me-render aplikasi ke elemen HTML #root
createRoot(document.getElementById('root')).render(
  // StrictMode: membantu mendeteksi masalah saat development (efek ganda, dsb.)
  <StrictMode>
    <App />
  </StrictMode>,
)
