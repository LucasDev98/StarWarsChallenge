import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


// ROUTER
import  AppRouter  from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter/>
  </StrictMode>,
)
