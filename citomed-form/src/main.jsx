import { StrictMode } from 'react'
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
