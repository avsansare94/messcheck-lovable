
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import Sentry for error tracking
import './lib/sentry'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
