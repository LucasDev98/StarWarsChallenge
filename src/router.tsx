import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

// Carga diferida de los componentes
const HeroesPage = lazy(() => import('./pages/heroes'));
const HeroePage = lazy(() => import('./pages/heroe'));
const NotFoundPage = lazy(() => import('./pages/notFound'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Navigate to="/heroes" replace />} />
          <Route path="/heroes" element={<HeroesPage />} />
          <Route path="/heroe/:heroId" element={<HeroePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
}