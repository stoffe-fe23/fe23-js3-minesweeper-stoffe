/*
    Inlämningsuppgift 2 "Röj", JavaScript 3, Kristoffer Bengtsson (FE23)
    Vite boilerplate script.
*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
