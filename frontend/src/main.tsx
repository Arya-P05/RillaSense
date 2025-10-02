import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import FullConvo from './FullConvo.tsx'
import OvertimeListPage from './pages/overtimeListPage.tsx/overtimeListPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/full-convo" element={<FullConvo />} />
        <Route path="/overtime" element={<OvertimeListPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
