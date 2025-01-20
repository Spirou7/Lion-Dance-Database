import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sections from './section.jsx'
import Header from './header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Sections />
  </StrictMode>,
)
