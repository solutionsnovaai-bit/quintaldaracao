import React from 'react'
import ReactDOM from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './fonts.css'
import './tema.css'
import './styles.css'
import App from './App'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
