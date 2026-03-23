import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotFound } from './components/NotFound.tsx'

const is404 = window.location.pathname === '/404';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {is404 ? <NotFound /> : <App />}
  </StrictMode>,
)
