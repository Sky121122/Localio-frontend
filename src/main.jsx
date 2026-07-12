import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/AuthContext.jsx'
import {HelmetProvider} from "react-helmet-async"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>

    <Toaster
      position='top-right'
      toastOptions={{
        duration: 7000,
      }}
      reverseOrder={false}
    />

  </StrictMode>,
)
