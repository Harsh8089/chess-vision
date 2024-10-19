import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
   <GoogleOAuthProvider clientId='587739017297-o43mql4rji7ak23q4vjb4hree1j51sd5.apps.googleusercontent.com'>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
   </GoogleOAuthProvider>
)
