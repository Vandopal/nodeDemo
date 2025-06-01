import './styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import CreatePartners from './CreatePartners'
import UpdatePartners from './UpdatePartners'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreatePartners />} />
        <Route path="/update" element={<UpdatePartners />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
