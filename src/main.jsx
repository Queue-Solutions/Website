import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initMetaPixel } from './lib/metaPixel'

if (!window.location.pathname.startsWith('/admin')) {
  initMetaPixel()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
