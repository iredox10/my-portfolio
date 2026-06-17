import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'
import { SmoothScroll } from './context/SmoothScroll.jsx'
import { AudioProvider } from './components/AudioProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SmoothScroll>
          <AudioProvider>
            <App />
          </AudioProvider>
        </SmoothScroll>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
