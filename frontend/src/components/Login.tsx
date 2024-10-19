import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (response) => {
            const { access_token, token_type } = response;
            const userData = {access_token, token_type};
            setUser(userData);
            navigate('/home');
        },
        onError: (err) => {
            console.log(err)
        }
    });

    return (
        <div className='w-[100vw] h-[100vh] bg-black text-white'>
             <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>
     )
}

export default Login


