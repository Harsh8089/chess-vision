import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Lock, LogIn, Mail } from 'lucide-react';
import FormInput from './FormInput';
import Button from './Button';

interface IFormInput {
    email: string;
    password: string;
}

interface FormField {
    name: keyof IFormInput;
    placeholder: string;
    type?: string;
    icon: React.ReactNode;
    validation: Record<string, any>;
}

const formFields: FormField[] = [
    {
        name: 'email',
        placeholder: 'Email',
        icon: <Mail className="h-5 w-5" />,
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        }
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        icon: <Lock className="h-5 w-5" />,
        validation: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
            }
        }
    },
]

function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (response) => {
            const { access_token, token_type } = response;
            const userData = {access_token, token_type};
            setUser(userData);
            navigate('/profile');
        },
        onError: (err) => {
            console.log(err)
        }
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    return (
        <div className='w-full max-w-md mx-auto p-6 space-y-8'>
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-500 bg-opacity-10 rounded-full">
                    <LogIn className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold">Welcome Back</h2>
                <p className="text-gray-400 text-center">
                    Log in to your account and continue your journey
                </p>
            </div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4 items-center justify-center w-full mt-10'
            >
                {formFields.map((field) => (
                    <FormInput
                        key={field.name}
                        field={field}
                        register={register}
                        errors={errors}
                        watch={watch}
                    />
                ))}

                <Button isSubmitting={isSubmitting} title='Login' />
            </form>
            <div className="flex justify-center items-center">
                <div className="w-20 h-[1px] bg-white/20" />
                <span className="px-4 text-white/60">or</span>
                <div className="w-20 h-[1px] bg-white/20" />
            </div>
            <button 
                onClick={() => login()}
                className='border-white border-2 w-full p-2 rounded-lg place-items-end'
            >
                Sign in with Google 🚀 
            </button>
        </div>
     )
}

export default Login


