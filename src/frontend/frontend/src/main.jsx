import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserLocationProvider } from './Context/UserLocationContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserLocationProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </UserLocationProvider>,
)
