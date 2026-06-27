import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotFound } from './components/NotFound.tsx'

const is404 = window.location.pathname.endsWith('/404') || window.location.pathname.endsWith('/404.html');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {is404 ? <NotFound /> : <App />}
  </StrictMode>,
)
