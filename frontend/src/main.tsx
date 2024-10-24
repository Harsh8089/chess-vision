import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.tsx'
import { SinglePlayerProvider } from './context/SinglePlayer.tsx'

var clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(

   <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
            <SinglePlayerProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SinglePlayerProvider>
        </AuthProvider>
   </GoogleOAuthProvider>
)
