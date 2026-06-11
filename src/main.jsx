import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'
import { SmoothScroll } from './context/SmoothScroll.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
